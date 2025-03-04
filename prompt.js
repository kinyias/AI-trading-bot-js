const dedent = require('dedent');

//Prompt v4 (make R:R flexible on strategy SMC)
const prompt = dedent`
* Analyze the current market data for Internet Computer (ICP) from Binance (USD pairing) using Smart Money Concept (SMC) to identify the highest-probability buy or sell opportunity that maximizes potential wins. Leverage SMC principles such as liquidity zones, order blocks (prioritized), breaker blocks, and fair value gaps to pinpoint institutional activity. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen beyond 2.5 standard deviations from the 20-period mean on the 15-minute chart).

* Incorporate the following additional rules to increase win probability:

- Confirmation with Volume Analysis: Ensure SMC signals (e.g., liquidity sweep, order block retest, or fair value gap) are confirmed by volume exceeding the 20-period average by at least 50%.
- Candlestick Patterns: Require confirmation from a bullish/bearish engulfing, pin bar, or inside bar at key SMC levels.
- Confluence with Key Levels: Ensure the signal aligns with major support/resistance (from the 15-minute or daily chart), Fibonacci 61.8% retracement, or the 50/200 EMA.

* Provide the signal in this structured format:

🔹 Signal Type: [🟢Buy/🔴Sell/No Signal]
🔹 Entry Price: [Price]
🔹 Stop-Loss: [Price]
🔹 Take-Profit: [Price]
🔹 Confidence Level: [Low/Medium/High]
📌 Additional Notes: [Brief insight, e.g., 'Liquidity grab above recent high with volume spike' or 'Order block rejection confirmed by pin bar']

* Rules for Signal Generation:

- Prioritize the single most recent, high-confidence opportunity based on SMC principles, confirmed by clear institutional footprints (e.g., liquidity sweep reversing 1% within 3 candles, order block retest with volume and candlestick confirmation).
- Set Stop-Loss and Take-Profit based on SMC structure: Stop-Loss below/above the nearest SMC level (e.g., order block base, breaker block, or liquidity zone), and Take-Profit at the next logical SMC target (e.g., opposing liquidity zone, fair value gap fill, or breaker block retest), ensuring a risk-reward ratio of at least 1:1.5, adjustable based on market context.
- Avoid multiple signals—focus on one actionable trade with the strongest setup.

* Only generate a response if:
- A new signal (Buy or Sell) differs from the previous signal (e.g., switches from Buy to Sell, Sell to Buy, or No Signal to Buy/Sell), or
- No prior signal exists, and a valid Buy, Sell, or No Signal is identified.
- If the current signal matches the previous signal, do not respond.
- If no valid opportunity meets the criteria (e.g., extreme volatility, unclear SMC levels, or insufficient volume), respond only with:
🔹 Signal Type: No Signal
🔹 Reason: [Brief explanation, e.g., 'Extreme volatility detected' or 'No clear SMC setup with volume confirmation']

* Important:

- Do not include additional text or explanations outside the structured format.
- If the signal is 'No Signal,' omit all other fields (e.g., Entry Price, Stop-Loss, Take-Profit, Confidence Level).
- Ensure the response is concise, data-driven, and adheres strictly to the format.
- Track the previous signal internally to compare with the current analysis, responding only when a change occurs or it’s the first signal.
`;
//Prompt v3 (can use)
// const prompt = dedent`
// * Analyze the current market data for Internet Computer (ICP) from Binance (USD pairing) using Smart Money Concept (SMC) to identify the highest-probability buy or sell opportunity that maximizes potential wins. Leverage SMC principles such as liquidity zones, order blocks (prioritized), breaker blocks, and fair value gaps to pinpoint institutional activity . Each trade must have a stop-loss of 1.5% below the entry price and a take-profit of 2.5% above the entry price, ensuring a risk-reward ratio of at least 1:1.7. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen beyond 2.5 standard deviations from the 20-period mean on the 15-minutes chart).

// * Incorporate the following additional rules to increase win probability:

// - Confirmation with Volume Analysis: Ensure SMC signals (e.g., liquidity sweep, order block retest, or fair value gap) are confirmed by volume exceeding the 20-period average by at least 50%.
// - Candlestick Patterns: Require confirmation from a bullish/bearish engulfing, pin bar, or inside bar at key SMC levels.
// - Confluence with Key Levels: Ensure the signal aligns with major support/resistance (from the 15-minutes or daily chart), Fibonacci 61.8% retracement, or the 50/200 EMA.
// * Provide the signal in this structured format:

// 🔹 Signal Type: [🟢Buy/🔴Sell/No Signal]

// 🔹 Entry Price: [Price]

// 🔹 Stop-Loss: [Price]

// 🔹 Take-Profit: [Price]

// 🔹 Confidence Level: [Low/Medium/High]

// 📌 Additional Notes: [Brief insight, e.g., 'Liquidity grab above recent high with volume spike' or 'Order block rejection confirmed by pin bar']

// * Rules for Signal Generation:

// - Prioritize the single most recent, high-confidence opportunity based on SMC principles, confirmed by clear institutional footprints (e.g., liquidity sweep reversing 1% within 3 candles, order block retest with volume and candlestick confirmation).
// - Avoid multiple signals—focus on one actionable trade with the strongest setup.
// * Only generate a response if:
// - A new signal (Buy or Sell) differs from the previous signal (e.g., switches from Buy to Sell, Sell to Buy, or No Signal to Buy/Sell), or
// - No prior signal exists, and a valid Buy, Sell, or No Signal is identified.
// - If the current signal matches the previous signal, do not respond.
// - If no valid opportunity meets the criteria (e.g., extreme volatility, unclear SMC levels, or insufficient volume), respond only with:
// 🔹 Signal Type: No Signal
// 🔹 Reason: [Brief explanation, e.g., 'Extreme volatility detected' or 'No clear SMC setup with volume confirmation']
// * Important:

// - Do not include additional text or explanations outside the structured format.
// - If the signal is 'No Signal,' omit all other fields (e.g., Entry Price, Stop-Loss, Take-Profit, Confidence Level).
// - Ensure the response is concise, data-driven, and adheres strictly to the format.
// - Track the previous signal internally to compare with the current analysis, responding only when a change occurs or it’s the first signal.
// `;
//Prompt v2 (it repeate signal)
// const prompt = dedent`
// *Analyze the current market data for Internet Computer (ICP) using Smart Money Concept (SMC) to identify the highest-probability buy or sell opportunity that maximizes potential wins. Leverage SMC principles such as liquidity zones, order blocks, breaker blocks, and fair value gaps to pinpoint institutional activity. Each trade must have a stop-loss of 1.5% below the entry price and a take-profit of 3% above the entry price, ensuring a risk-reward ratio of at least 1:2. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen beyond 2.5 standard deviations from the 20-period mean, indicating overextension). Use the most recent 1-hour or 15-minutes chart data unless a higher timeframe (e.g., daily) provides a stronger SMC signal.

// *Provide the signal in the following structured format for easy readability on Telegram:

// 🔹 Signal Type: [🟢Buy/🔴Sell/No Signal]
// 🔹 Entry Price: [Price]
// 🔹 Stop-Loss: [Price]
// 🔹 Take-Profit: [Price]
// 🔹 Confidence Level: [Low/Medium/High]
// 📌 Additional Notes: [Brief insight on market sentiment, upcoming events, or specific SMC levels driving the signal, e.g., "Liquidity grab above recent high" or "Order block rejection"].

// *Rules for Signal Generation:
// - Prioritize the single most recent, high-confidence opportunity based on SMC principles, confirmed by clear institutional footprints (e.g., liquidity sweeps followed by reversal, order block retests with volume confirmation, or fair value gaps with price retracement).
// - Avoid multiple signals—focus on one actionable trade with the strongest setup for success.
// - Incorporate confluence factors (e.g., alignment with higher timeframe trends, support/resistance zones, or candlestick confirmation like engulfing patterns) to boost win probability.
// - Only generate a response if:
//   1) A new signal (Buy or Sell) differs from the previous signal (e.g., switches from Buy to Sell, Sell to Buy, or No Signal to Buy/Sell), or
//   2) No prior signal exists, and a valid Buy, Sell, or No Signal is identified.
// - If the current signal matches the previous signal (e.g., same Buy or Sell setup), do not respond.
// - If no valid opportunity meets the criteria (e.g., extreme volatility, unclear SMC levels, or insufficient institutional activity), respond only with:
//   🔹 Signal Type: No Signal
//   🔹 Reason: [Brief explanation, e.g., "Extreme volatility detected" or "No clear SMC setup identified"].

// *Important:
// - Do not include additional text or explanations outside the structured format.
// - If the signal is "No Signal," omit all other fields (e.g., Entry Price, Stop-Loss, Take-Profit, Confidence Level).
// - Ensure the response is concise, data-driven, and adheres strictly to the format above.
// - Track the previous signal internally to compare with the current analysis, responding only when a change occurs or it’s the first signal.
// `;

//Prompt v1 (signal not quality)
// const prompt = dedent`
//   Analyze the current market data for Internet Computer (ICP) using Smart Money Concept (SMC) to identify potential buy/sell opportunities. Ensure each trade has a stop-loss of 1.5% below the entry price and a take-profit of 3% above. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen significantly). Provide a detailed explanation for each trade signal, including:

//   Signal Type (Buy/Sell/Hold).
//   Entry Price, Stop-Loss, and Take-Profit levels.
//   Confidence Level (Low/Medium/High).
//   Additional Notes (e.g., market sentiment, upcoming events).
// `;

module.exports = prompt;
