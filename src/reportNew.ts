import { slackClient } from "./slack"

const SLACK_CHANNEL = process.env.SLACK_CHANNEL || ""
;(async () => {
	const { ts } = await slackClient.chat.postMessage({
		channel: SLACK_CHANNEL,
		text: `*Я.Лендинг*\n:white_check_mark: Первый запуск тестов прошёл успешно. Скриншоты отправлены <${process.env.PULL_REQUEST_URL}|пулл реквестом>`
	})
})()
