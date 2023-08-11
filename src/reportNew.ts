import { slackClient } from "./slack"
import fs from "fs"
import path from "path"
import os from "os"

const SLACK_CHANNEL = process.env.SLACK_CHANNEL || ""
;(async () => {
	const newFilesList = fs
		.readFileSync(path.join(__dirname, "../app_snapshots/newFiles"), {
			encoding: "utf-8",
		})
		.toString()
		.split(os.EOL)
		.filter(Boolean)

	if (!newFilesList.length) return

	const { ts } = await slackClient.chat.postMessage({
		channel: SLACK_CHANNEL,
		text: `*Я.Лендинг*\n:tada: Появились новые скриншоты. <${process.env.PULL_REQUEST_URL}|Пулл реквест>`,
	})
	const configMap = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../test_config.map.json"), "utf8")
	) as Record<string, string>

	for (let file of newFilesList) {
		const url = configMap[file.split("/")[1]]

		await slackClient.files.upload({
			channels: SLACK_CHANNEL,
			thread_ts: ts,
			filename: path.extname(file),
			file: fs.createReadStream(
				path.join(__dirname, `../app_snapshots/${file}`)
			),
			initial_comment: `${url}`,
		})
	}
})()
