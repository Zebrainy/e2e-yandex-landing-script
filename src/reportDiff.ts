import { slackClient } from "./slack"
import fs from "fs"
import path from "path"

const SLACK_CHANNEL = process.env.SLACK_CHANNEL || ""
;(async () => {
	const { ts } = await slackClient.chat.postMessage({
		channel: SLACK_CHANNEL,
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

		await slackClient.files.upload({
			channels: SLACK_CHANNEL,
			thread_ts: ts,
			filename: dir + path.extname(screenName),
			file: fs.createReadStream(
				path.join(
					__dirname,
					`../app_snapshots/diff/${dir}/${screenName}`
				)
			),
			initial_comment: `${url}`,
		})
	}
})()
