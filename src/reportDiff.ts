import { TelegramBot } from "./telegram"
import fs from "fs"
import path from "path"

const CHANNEL_ID = process.env.CHANNEL_ID || ""
const CHAT_ID = process.env.CHAT_ID || ""
;(async () => {
	const { postedMessage } = await TelegramBot.sendMessage({
		chatId: CHANNEL_ID,
		text: `*Я.Лендинг*\n:smiling_face_with_tear: Упс, тест упал, но я уже создал <${process.env.PULL_REQUEST_URL}|пулл реквест>`,
	})
	const diffDir = fs.readdirSync(
		path.join(__dirname, "../app_snapshots/diff")
	)
	const configMap = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../test_config.map.json"), "utf8")
	) as Record<string, string>

	for (let dir of diffDir) {
		const url = configMap[dir]
		const screenName = fs.readdirSync(
			path.join(__dirname, `../app_snapshots/diff/${dir}`)
		)[0]
        
		// Место кривых набросков
		await TelegramBot.sendPhoto(
			channels: CHAT_ID,
			{ replyToMessage: postedMessage.message_id,
				fileName: fs.createReadStream(
				path.join(
					__dirname,
					`../app_snapshots/diff/${dir}/${screenName}`
				)
			}
				),
			initial_comment: `${url}`,
		})
		await 
	}
})()
