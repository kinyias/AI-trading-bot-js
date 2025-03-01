const dedent = require('dedent');

const prompt = dedent`
  Analyze the current market data for Internet Computer (ICP) using Smart Money Concept (SMC) to identify potential buy/sell opportunities. Ensure each trade has a stop-loss of 1.5% below the entry price and a take-profit of 3% above. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen significantly). Provide the signal in the following structured format for easy readability on Telegram:
  
🔹 Signal Type: [🟢Buy/🔴Sell/Hold]  
🔹 Entry Price: [Price]  
🔹 Stop-Loss: [Price]  
🔹 Take-Profit: [Price]  
🔹 Confidence Level: [Low/Medium/High]  

📌 **Additional Notes:**  
- [Market sentiment, upcoming events, or key SMC levels].  
Focus on the most recent and high-confidence opportunity based on SMC principles (e.g., liquidity zones, order blocks, breaker blocks, or fair value gaps). Avoid overloading with multiple signals—provide only one clear and actionable signal.
If no valid or high-confidence opportunity is found, or if market conditions are unsuitable (e.g., extreme volatility, unclear SMC levels), respond with:
🔹 Signal Type: No Signal  
🔹 Reason: [Brief explanation, e.g., "Market conditions are unclear" or "No high-confidence SMC levels detected"].  
`;
// const prompt = dedent`
//   Analyze the current market data for Internet Computer (ICP) using Smart Money Concept (SMC) to identify potential buy/sell opportunities. Ensure each trade has a stop-loss of 1.5% below the entry price and a take-profit of 3% above. Avoid trading during periods of extreme volatility (e.g., when Bollinger Bands widen significantly). Provide a detailed explanation for each trade signal, including:

//   Signal Type (Buy/Sell/Hold).
//   Entry Price, Stop-Loss, and Take-Profit levels.
//   Confidence Level (Low/Medium/High).
//   Additional Notes (e.g., market sentiment, upcoming events).
// `;

module.exports = prompt;
