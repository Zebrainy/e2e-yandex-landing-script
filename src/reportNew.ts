import fs from "fs"
import path from "path"
import os from "os"
import { TelegramBot } from "./telegram"

const CHANNEL_ID = process.env.CHANNEL_ID || ""
const CHAT_ID = process.env.CHAT_ID || ""
;(async () => {
	const newFilesList = fs
		.readFileSync(path.join(__dirname, "../newFiles"), {
			encoding: "utf-8",
		})
		.toString()
		.split(os.EOL)
		.filter(Boolean)

	if (!newFilesList.length) return

	const response = await TelegramBot.telegram.sendMessage(
		CHANNEL_ID,
		`*Я.Лендинг*\n:tada: Появились новые скриншоты. <${process.env.PULL_REQUEST_URL}|Пулл реквест>`
	)

	await new Promise((res) => setTimeout(res, 5000))

	const disscusChatInfo = await TelegramBot.telegram.getChat(CHAT_ID)

	const configMap = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../test_config.map.json"), "utf8")
	) as Record<string, string>

	for (let file of newFilesList) {
		const url = configMap[file.split("/")[1]]

		await TelegramBot.telegram.sendPhoto(
			CHAT_ID,
			{
				source: fs.createReadStream(
					path.join(__dirname, `../app_snapshots/${file}`)
				),
			},
			{
				caption: url,
				reply_to_message_id: disscusChatInfo.pinned_message?.message_id || 0,
			}
		)
	}
})()
