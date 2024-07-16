import { escapeMarkdownV2 } from "../utils";
import { Context } from "telegraf";

export const startCommand = async (ctx: Context) => {
  const welcomeGifUrl = "https://tradecalls.app/tradebg.png";

  const rawMessage = `
We are thrilled to have you on board. Follow the instructions below to get started:

1. \`Deposit\`: 
   Deposit funds to the following wallet addresses:
   \n
   - **USDT (ERC20)**: _(click to copy)_ \n \`0x1234567890abcdef1234567890abcdef12345678\`
   \n
   - **USDC (ERC20)**: _(click to copy)_ \n\`0xabcdef1234567890abcdef1234567890abcdef12\`
   \n
   - **DAI (ERC20)**: _(click to copy)_ \n\`0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef\`

2. \`Monitor\`: 
   After depositing, you will be notified once the funds are confirmed.

3. \`Trade\`: 
   Stay tuned for daily trade calls and make the most out of your trading journey!

**Happy Trading!** 🚀
`;

  const message = escapeMarkdownV2(rawMessage.trim());

  await ctx.replyWithPhoto(
    { url: welcomeGifUrl },
    { caption: message, parse_mode: "MarkdownV2" }
  );
};
