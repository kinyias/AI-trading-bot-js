const ccxt = require('ccxt');
const axios = require('axios');
const moment = require('moment-timezone');
const prompt = require('./prompt');
const dotenv = require('dotenv')
const {Telegraf} = require('telegraf')
dotenv.config()
// Configuration
const telegramToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const bot = new Telegraf(telegramToken);
const OPENROUTER_API_URL =  process.env.OPENROUTER_API_URL;
const OPENROUTER_API_KEY =
process.env.OPENROUTER_API_KEY; // Replace with your OpenRouter API key
const SYMBOL = 'ICP/USDT'; // Trading pair
const TIMEFRAME = '15m'; // Timeframe for data
const AMOUNT = 1; // Amount to trade (e.g., 1 ICP)

// Initialize exchange (e.g., Binance)
const exchange = new ccxt.binance();

// Fetch market data
async function fetchMarketData(symbol, timeframe, limit = 600) {
  const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
  const df = ohlcv.map(([timestamp, open, high, low, close, volume]) => ({
    timestamp: moment.tz(timestamp, 'Asia/Bangkok').format(), // Convert to UTC+7
    open,
    high,
    low,
    close,
    volume,
  }));
  return df;
}

// Get AI trading signal from OpenRouter DeepSeek API
async function getAISignal(marketData) {
  const headers = {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  };
  const payload = {
    model: 'deepseek/deepseek-chat:free', // Specify the DeepSeek model
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: JSON.stringify(marketData),
      },
    ],
  };

  try {
    const response = await axios.post(OPENROUTER_API_URL, payload, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      'Error fetching AI signal:',
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

// Execute trade based on AI signal
async function executeTrade(signal, symbol, amount) {
  try {
    if (signal.toLowerCase().includes('buy')) {
      // const order = await exchange.createMarketBuyOrder(symbol, amount);
      await bot.telegram.sendMessage(chatId, signal);
      console.log('Buy Order Executed:');
    } else if (signal.toLowerCase().includes('sell')) {
    //   const order = await exchange.createMarketSellOrder(symbol, amount);
      console.log('Sell Order Executed:');
      await bot.telegram.sendMessage(chatId, signal);
    } else {
      console.log('No action taken (hold).');
    }
  } catch (error) {
    console.error('Error executing trade:', error);
  }
}

// Main loop
async function main() {
  while (true) {
    try {
      // Step 1: Fetch market data
      console.log('Fetching market data...');
      const marketData = await fetchMarketData(SYMBOL, TIMEFRAME);
      console.log(marketData.slice(-5)); // Display last 5 rows

      // Step 2: Get AI trading signal
      console.log('Fetching AI signal...');
      const aiSignal = await getAISignal(marketData);
      console.log('AI Signal:', aiSignal);

      // Step 3: Execute trade based on AI signal
      if (aiSignal) {
        await executeTrade(aiSignal, SYMBOL, AMOUNT);
      }

      // Wait before the next iteration
      console.log('Waiting for the next cycle...');
      await new Promise((resolve) => setTimeout(resolve, 15 * 60 * 1000)); // Wait 15 minutes
    } catch (error) {
      console.error('Error in main loop:', error);
      await new Promise((resolve) => setTimeout(resolve, 60 * 1000)); // Wait 1 minute before retrying
    }
  }
}

// Run the bot
main();
