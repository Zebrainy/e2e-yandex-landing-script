import { TelegramBot } from "./telegram"
import fs from "fs"
import path from "path"

const CHANNEL_ID = process.env.CHANNEL_ID || ""
const CHAT_ID = process.env.CHAT_ID || ""
;(async () => {
	const response = await TelegramBot.telegram.sendMessage(
		CHANNEL_ID,
`*Я.Лендинг* 
🥲 Упс, тест упал, но я уже создал [пулл реквест>](${process.env.PULL_REQUEST_URL})
`
	)
	await new Promise((res) => setTimeout(res, 5000))

	const disscusChatInfo = await TelegramBot.telegram.getChat(CHAT_ID)

	const diffDir = fs.readdirSync(path.join(__dirname, "../app_snapshots/diff"))
	const configMap = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../test_config.map.json"), "utf8")
	) as Record<string, string>

	for (let dir of diffDir) {
		const url = configMap[dir]
		const screenName = fs.readdirSync(
			path.join(__dirname, `../app_snapshots/diff/${dir}`)
		)[0]

		const file = fs.createReadStream(
			path.join(__dirname, `../app_snapshots/diff/${dir}/${screenName}`)
		)
		await TelegramBot.telegram.sendPhoto(
			CHAT_ID,
			{
				source: file,
			},
			{
				caption: url,
				reply_to_message_id: disscusChatInfo.pinned_message?.message_id || 0,
			}
		)
	}
})()
