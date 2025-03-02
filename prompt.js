const dedent = require('dedent');

const prompt = dedent`
*Analyze the current market data for Internet Computer (ICP) using Smart Money Concept (SMC) to identify the highest-probability buy or sell opportunity that maximizes potential wins. Leverage SMC principles such as liquidity zones, order blocks, breaker blocks, and fair value gaps to pinpoint institutional activity. Each trade must have a stop-loss of 1.5% below the entry price and a take-profit of 3% above the entry price, ensuring a risk-reward ratio of at least 1:2. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen beyond 2.5 standard deviations from the 20-period mean, indicating overextension). Use the most recent 1-hour or 4-hour chart data unless a higher timeframe (e.g., daily) provides a stronger SMC signal.

*Provide the signal in the following structured format for easy readability on Telegram:

🔹 Signal Type: [🟢Buy/🔴Sell/No Signal]

🔹 Entry Price: [Price]

🔹 Stop-Loss: [Price]

🔹 Take-Profit: [Price]

🔹 Confidence Level: [Low/Medium/High]

📌 Additional Notes:

[Brief insight on market sentiment, upcoming events, or specific SMC levels driving the signal, e.g., "Liquidity grab above recent high" or "Order block rejection"].
*Rules for Signal Generation:

Prioritize the single most recent, high-confidence opportunity based on SMC principles, confirmed by clear institutional footprints (e.g., liquidity sweeps followed by reversal, order block retests with volume confirmation, or fair value gaps with price retracement).
Avoid multiple signals—focus on one actionable trade with the strongest setup for success.
Incorporate confluence factors (e.g., alignment with higher timeframe trends, support/resistance zones, or candlestick confirmation like engulfing patterns) to boost win probability.
If no valid opportunity meets the criteria (e.g., extreme volatility, unclear SMC levels, or insufficient institutional activity), respond only with:
🔹 Signal Type: No Signal
🔹 Reason: [Brief explanation, e.g., "Extreme volatility detected" or "No clear SMC setup identified"].
*Important:

Do not include additional text or explanations outside the structured format.
If the signal is "No Signal," omit all other fields (e.g., Entry Price, Stop-Loss, Take-Profit, Confidence Level).
Ensure the response is concise, data-driven, and adheres strictly to the format above.
`;
// const prompt = dedent`
//   Analyze the current market data for Internet Computer (ICP) using Smart Money Concept (SMC) to identify potential buy/sell opportunities. Ensure each trade has a stop-loss of 1.5% below the entry price and a take-profit of 3% above. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen significantly). Provide a detailed explanation for each trade signal, including:

//   Signal Type (Buy/Sell/Hold).
//   Entry Price, Stop-Loss, and Take-Profit levels.
//   Confidence Level (Low/Medium/High).
//   Additional Notes (e.g., market sentiment, upcoming events).
// `;

module.exports = prompt;
