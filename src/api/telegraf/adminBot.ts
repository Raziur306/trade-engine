import env from "../../config/env";
import { Telegraf } from "telegraf";

const adminBot = new Telegraf(env.ADMIN_TELEGRAM_BOT_TOKEN);

adminBot.start((ctx) => {
  ctx.reply(`Hello, ${ctx.from.first_name}! I am the admin bot.🤖`);
});

export const sendMessageToAdminGroup = (message: string): void => {
  const adminGroupId = env.ADMIN_GROUP_ID;
  adminBot.telegram.sendMessage(env.USER_ID, message, {
    parse_mode: "MarkdownV2",
  });
};

export default adminBot;
