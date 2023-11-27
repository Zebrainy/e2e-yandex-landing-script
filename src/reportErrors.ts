import { TelegramBot } from "./telegram"

const CHANNEL_ID = process.env.CHANNEL_ID || ""
const CHAT_ID = process.env.CHAT_ID || ""

;(async () => {
	const response = await TelegramBot.telegram.sendMessage(
		CHANNEL_ID,
`*Я.Лендинг* 🥲 
Упс, тест упал по неизвестной причине. 
[Подробнее](${process.env.GITHUB_ACTION_URL})`
	)
})()
