import { Telegraf } from "telegraf"

export const TelegramBot = new Telegraf(process.env.TELEGRAM_TOKEN || "")
