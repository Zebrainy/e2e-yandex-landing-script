import { Page } from "playwright"
import { toMatchImageSnapshot } from "jest-image-snapshot"
import fs from "fs"
import { getHash } from "../src/hash"
import path from "path"

expect.extend({ toMatchImageSnapshot })

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const takeScreenshot = async (
	dirName: string,
	fileName: string,
	snapshot: Buffer
) => {
	expect(snapshot).toMatchImageSnapshot({
		customSnapshotIdentifier: fileName,

		customSnapshotsDir: `./app_snapshots/${dirName}/base/`,
		customDiffDir: `./app_snapshots/diff/${dirName}/`,
		failureThreshold: 0.005,
		failureThresholdType: "percent",
	})
}

const openPage = async (page: Page, url: string) => {
	await page.setExtraHTTPHeaders({
		Authorization: `OAuth ${process.env.YANDEX_TOKEN}`,
	})
	await page.goto(url, {
		timeout: 60000,
	})
}
type TestCfg = { url: string; delay: string }[]

const readDirToList = (path: string) => {
	try {
		return fs.readdirSync(path)
	} catch {
		return []
	}
}

let hasErrors = false
describe("Test", () => {
	const cfg = fs.readFileSync(process.env.CONFIG_PATH, "utf8")
	const testCfg = JSON.parse(cfg) as TestCfg

	const configHashMap = {} as Record<string, string>
	for (let test of testCfg) {
		const hash = getHash(test.url)
		configHashMap[hash] = test.url

		const baseSnapshots = readDirToList(`./app_snapshots/${hash}/base`)

		it("First page", async () => {
			let failsCounts = 0
			await openPage(page, test.url)
			await page.waitForLoadState("domcontentloaded")
			await sleep(parseInt(test.delay || "2000"))
			const currScreen = await page.screenshot({
				fullPage: false,
				path: `./app_snapshots/${hash}/received/screen-${String(
					Math.random()
				).slice(2)}-snap.png`,
			})

			for (let screenName of baseSnapshots) {
				try {
					await takeScreenshot(
						getHash(test.url),
						screenName.replace(/-snap.png|-diff.png/, ""),
						currScreen
					)
				} catch {
					failsCounts++
				}
			}
			if (failsCounts === baseSnapshots.length) {
				hasErrors = true
			} else {
				// удалить diff чтобы он не прошёл дальше по флоу, так как истинным diff считается тот, который зафейлился со всеми base
				const hash = getHash(test.url)
				fs.rmSync(`./app_snapshots/diff/${hash}`, {
					force: true,
					recursive: true,
				})
			}
		})
	}

	fs.writeFileSync(
		path.join(__dirname, "../test_config.map.json"),
		JSON.stringify(configHashMap, null, 2),
		"utf8"
	)
})
afterAll((cb) => {
	process.exit(hasErrors ? 1 : 0)
})

