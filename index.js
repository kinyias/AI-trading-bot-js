const express = require('express');
const ccxt = require('ccxt');
const axios = require('axios');
const moment = require('moment-timezone');
const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');
const prompt = require('./prompt');

dotenv.config();

// Configuration
const telegramToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const bot = new Telegraf(telegramToken);
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SYMBOL = 'ICP/USDT';
const TIMEFRAME = '15m';
const AMOUNT = 1;

const exchange = new ccxt.binance();
const app = express();
const PORT = process.env.PORT || 3000;

let botRunning = false;
let botInterval = null;
let conversationHistory = []; // Store conversation history

// Fetch market data
async function fetchMarketData(symbol, timeframe, limit = 800) {
  const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
  return ohlcv.map(([timestamp, open, high, low, close, volume]) => ({
    timestamp: moment.tz(timestamp, 'Asia/Bangkok').format(),
    open,
    high,
    low,
    close,
    volume,
  }));
}

// Get AI trading signal
async function getAISignal(marketData, previousMessages = []) {
  try {
    // Combine previous messages with the new market data
    const messages = [
      { role: 'system', content: prompt },
      ...previousMessages, // Include previous messages
      { role: 'user', content: JSON.stringify(marketData) }, // Add new market data
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'deepseek/deepseek-chat:free',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiSignal = response.data.choices[0].message.content;

    // Add the AI's response to the messages array for future context
    messages.push({ role: 'assistant', content: aiSignal });

    return { aiSignal, messages }; // Return both the signal and updated messages
  } catch (error) {
    console.error(
      'Error fetching AI signal:',
      error.response?.data || error.message
    );
    await bot.telegram.sendMessage(
      chatId,
      `${error.response?.data || error.message}`
    );
    return null;
  }
}

// Execute trade
async function executeTrade(signal, symbol, amount) {
  try {
    if (signal.toLowerCase().includes('buy')) {
      await bot.telegram.sendMessage(chatId, `${signal}`);
      console.log('Buy Order Executed');
    } else if (signal.toLowerCase().includes('sell')) {
      await bot.telegram.sendMessage(chatId, `${signal}`);
      console.log('Sell Order Executed');
    } else {
      console.log('No trade action taken.');
    }
  } catch (error) {
    console.error('Error executing trade:', error);
  }
}

// Start trading bot
function startBot() {
  if (botRunning) {
    console.log('Bot is already running.');
    return;
  }

  botRunning = true;
  botInterval = setInterval(async () => {
    try {
      console.log('Fetching market data...');
      const marketData = await fetchMarketData(SYMBOL, TIMEFRAME);
      console.log(marketData.slice(-5));

      console.log('Fetching AI signal...');
      const result = await getAISignal(marketData, conversationHistory);
      if (result) {
        const { aiSignal, messages } = result;
        console.log('AI Signal:', aiSignal);

        // Update conversation history
        conversationHistory = messages;

        if (aiSignal) {
          await executeTrade(aiSignal, SYMBOL, AMOUNT);
        }
      }
    } catch (error) {
      console.error('Error in bot loop:', error);
    }
  }, 15 * 60 * 1000); // Runs every 15 minutes

  console.log('Trading bot started.');
}

// Stop trading bot
function stopBot() {
  if (!botRunning) {
    console.log('Bot is not running.');
    return;
  }

  clearInterval(botInterval);
  conversationHistory = []; // Reset conversation history
  botRunning = false;
  console.log('Trading bot stopped.');
}

// Express Routes
app.get('/', (req, res) => {
  res.send('Crypto Trading Bot is running.');
});

app.get('/start', (req, res) => {
  startBot();
  res.send('Trading bot started.');
});

app.get('/stop', (req, res) => {
  stopBot();
  res.send('Trading bot stopped.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
