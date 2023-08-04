declare global {
	namespace NodeJS {
		interface ProcessEnv {
			YANDEX_TOKEN: string			
			CONFIG_PATH: string
			PROXY_PASSWORD: string
			SLACK_TOKEN: string
			SLACK_CHANNEL: string
			PULL_REQUEST_URL: string
			GITHUB_ACTION_URL: string
		}
	}
}
export {}
