import { ITelegramOptions } from '../src/telegram/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
  return {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  };
};
