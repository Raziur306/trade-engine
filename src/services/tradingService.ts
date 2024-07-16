
import {
  OrderTimeInForceV5,
  CategoryListV5,
  TickerLinearInverseV5,
  OrderTypeV5,
} from "bybit-api";
import { BybitWrapper } from "../api/bybit/bybitAPi";
import { sendMessageToAdminGroup } from "../api/telegraf/adminBot";
import env from "../config/env";
import { getPrice } from "../utils/getPrice";
import { Context } from "telegraf";

async function placeTradeOrder(
  ctx: Context,
  amount: number,
  symbol: string,
  takeProfit: number,
  stopLoss: number
): Promise<any> {
  const bybit = new BybitWrapper(
    env.BYBIT_API_KEY,
    env.BYBIT_API_SECRET,
    env.Testnet === "false"
  );

  const response = await bybit.getTickers({
    category: "linear",
    symbol: symbol,
  });

  const livePrice: number | any = getPrice(
    response as CategoryListV5<TickerLinearInverseV5[], "linear">,
    symbol
  );

  if (livePrice === null) {
    sendMessageToAdminGroup(
      `Failed to get live price in tradeservice for symbol: ${symbol}`
    );
  }

  const orderPlaced = await bybit.placeOrder({
    category: "linear",
    side: "Buy",
    symbol: symbol,
    orderType: "Market" as OrderTypeV5,
    qty: (amount / livePrice).toFixed(2),
    timeInForce: "GTC" as OrderTimeInForceV5,
    reduceOnly: false,
    closeOnTrigger: false,
    orderLinkId: "TradeCall",
    takeProfit: takeProfit.toString(),
    stopLoss: stopLoss.toString(),
  });

  if (orderPlaced) {
    if (ctx && ctx.reply) {
      ctx.reply(`Order placed successfully:
        Symbol: ${symbol}
        Amount: $${amount}
        Take Profit: ${takeProfit}
        Stop Loss: ${stopLoss}
      `);
    }
  } else {
    if (ctx && ctx.reply) {
      ctx.reply("Failed to place order. Please try again later.");
    }
  }

  return orderPlaced;
}

export default placeTradeOrder;
