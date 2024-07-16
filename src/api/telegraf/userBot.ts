import env from "../../config/env";
import { startCommand } from "../../controllers";
import { Context, Telegraf } from "telegraf";


// In-memory storage for trade call details
const tradeCallDetails: { [key: number]: any } = {};

const userBot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

userBot.start(startCommand);

interface TradeCallContext extends Context {
  match: RegExpMatchArray;
}

userBot.action(
  /^TRADE_CALL_(.+)$/,
  async (
    ctx: TradeCallContext & {
      update: { callback_query?: { message?: { text?: string } } };
    }
  ) => {
    if (!ctx.from) {
      ctx.reply("Error: User information not found.");
      return;
    }

    const coin = ctx.match[1];
    const messageDetails = ctx.update.callback_query?.message?.text;

    if (messageDetails) {
      tradeCallDetails[ctx.from.id] = parseTradeCallMessage(messageDetails);
    }

    await ctx.reply("Please select the amount to trade:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "$500", callback_data: `TRADE_${coin}_500` }],
          [{ text: "$1000", callback_data: `TRADE_${coin}_1000` }],
        ],
      },
    });
  }
);

userBot.action(/^TRADE_(.+)_(500|1000)$/, async (ctx: TradeCallContext) => {
  if (!ctx.from) {
    ctx.reply("Error: User information not found.");
    return;
  }

  const [coin, amount] = ctx.match.slice(1);
  const tradeDetails = tradeCallDetails[ctx.from.id];

  if (tradeDetails) {
    ctx.reply(`Order placed successfully:
        Symbol: ${coin}
        Amount: $${amount}
        Take Profit: ${tradeDetails.takeProfit}
        Stop Loss: ${tradeDetails.stopLoss}
      `);
  } else {
    ctx.reply("Failed to place order. Please try again later.");
  }
});

export const sendMessageToChannel = (message: string): void => {
  userBot.telegram
    .sendMessage(env.ADMIN_TELEGRAM_CHAT_ID, message, {
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Trade this call", url: "https://t.me/tradecalls_app_bot" }],
        ],
      },
    })
    .then(() => {
      console.log("Message sent to channel");
    })
    .catch((error) => {
      console.error("Error sending message to channel", error);
    });
};

const parseTradeCallMessage = (message: string) => {
  const coinMatch = message.match(/Buy\s+(\w+)\s+at/i);
  const coin = coinMatch ? coinMatch[1] : "UNKNOWN";
  const symbol = `${coin}USDT`;

  const takeProfitMatch = message.match(/sell\s+at\s+\$([\d.]+)-\$([\d.]+)/i);
  const takeProfit = takeProfitMatch ? takeProfitMatch[2] : "";

  const stopLossMatch = message.match(/drops\s+to\s+\$([\d.]+)/i);
  const stopLoss = stopLossMatch ? stopLossMatch[1] : "";

  return {
    symbol,
    takeProfit,
    stopLoss,
  };
};

export default userBot;
