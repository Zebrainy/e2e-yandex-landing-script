declare global {
	namespace NodeJS {
		interface ProcessEnv {
			LANDING_URL: string
			YANDEX_TOKEN: string
			LANDING_URL_HASH: string
			DELAY_BEFORE_SCREENSHOT_MS: string
		}
	}
}
export {}
