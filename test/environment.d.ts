declare global {
	namespace NodeJS {
		interface ProcessEnv {
			YANDEX_TOKEN: string			
			CONFIG_PATH: string
			PROXY_PASSWORD: string
		}
	}
}
export {}
