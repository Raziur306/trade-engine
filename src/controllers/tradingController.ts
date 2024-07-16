import { Request, Response } from "express";
import { userBot } from "../api/telegraf";
import { sendMessageToAdminGroup } from "../api/telegraf/adminBot";
import { sendMessageToChannel } from "../api/telegraf/userBot";
import env from "../config/env";
import { ErrorService, escapeMarkdownV2 } from "../utils";

export const sendTradeCallMessage = async (req: Request, res: Response) => {
  try {
    const messages = req.body;

    if (!messages || messages.length === 0) {
      sendMessageToAdminGroup(`messages is empty in tradingController.ts`);
      return res.status(400).send({ error: "Message content is required" });
    }

    for (const message of [messages]) {
      const formattedMessage = formatTradeCallMessage(message);
      await userBot.telegram.sendMessage(
        env.USER_ID,
        escapeMarkdownV2(message.message),
        {
          parse_mode: "MarkdownV2",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Trade Call",
                  callback_data: `TRADE_CALL_${message.coin}`,
                },
              ],
            ],
          },
        }
      );

      sendMessageToChannel(formattedMessage);
    }

    res.status(200).send({ success: true });
  } catch (error) {
    ErrorService.handleApiError(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const formatTradeCallMessage = (message: any): string => {
  const { shillerName, coin, callPrices, position, takeProfits, stopLosses } =
    message;

  return `
    \\- **Shiller Name**: ${escapeMarkdownV2(shillerName)}
    \\- **Coin**: ${escapeMarkdownV2(coin)}
    \\- **Position**: ${escapeMarkdownV2(position)}
    \\- **Call Price**: ${escapeMarkdownV2(callPrices.join(", "))}
    \\- **Take Profit**: ${escapeMarkdownV2(takeProfits.join(", "))}
    \\- **Stop Loss**: ${escapeMarkdownV2(stopLosses.join(", "))}
  `.trim();
};
