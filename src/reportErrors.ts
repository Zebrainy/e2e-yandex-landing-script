import { slackClient } from "./slack"

const SLACK_CHANNEL = process.env.SLACK_CHANNEL || ""
;(async () => {
	const { ts } = await slackClient.chat.postMessage({
		channel: SLACK_CHANNEL,
		text: `*Я.Лендинг*\n:smiling_face_with_tear: Упс, тест упал по неизвестной причине.\n<${process.env.GITHUB_ACTION_URL}|Подробнее>`,
	})
})()
