import { execSync } from "child_process"
import fs from "fs"
import { getHash } from "./hash"

type TestCfg = { url: string; delay: string }[]

const cfgPath = process.argv[2] || ""
const yandexToken = process.argv[3] || ""

async function run() {
	const cfg = fs.readFileSync(cfgPath, "utf8")
	const testCfg = JSON.parse(cfg) as TestCfg
	console.log("CONFIG:", cfg)
	console.log("yandexToken:", yandexToken)
	for (let test of testCfg) {
		console.log("test:", test)
		const envs = `cross-env LANDING_URL="${
			test.url
		}" LANDING_URL_HASH="${getHash(
			test.url
		)}" YANDEX_TOKEN="${yandexToken}" DELAY_BEFORE_SCREENSHOT_MS="${
			test.delay
		}"`
		execSync(`${envs} yarn test`)
	}
}

run()
