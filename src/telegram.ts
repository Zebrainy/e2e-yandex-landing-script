import { Telegraf } from "telegraf"

export const TelegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN || "")
