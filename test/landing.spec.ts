import { Page } from "playwright"
import { toMatchImageSnapshot } from "jest-image-snapshot"
import fs from "fs"
import { getHash } from "../src/hash"

expect.extend({ toMatchImageSnapshot })

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const takeScreenshot = async (dir: string, dirName: string) => {
	const filename = "screen"
	expect(
		await page.screenshot({
			fullPage: false,
			path: `./app_snapshots/${dirName}/received/${dir}/${filename}-snap.png`,
		})
	).toMatchImageSnapshot({
		customSnapshotIdentifier: filename,
		customSnapshotsDir: `./app_snapshots/${dirName}/base/` + dir,
		customDiffDir: `./app_snapshots/${dirName}/diff/` + dir,
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

describe("Test", () => {
	const cfg = fs.readFileSync(process.env.CONFIG_PATH, "utf8")
	const testCfg = JSON.parse(cfg) as TestCfg

	for (let test of testCfg) {
		it("First page", async () => {
			await openPage(page, test.url)
			await page.waitForLoadState("domcontentloaded")
			await sleep(parseInt(test.delay || "2000"))
			await takeScreenshot(`${deviceName}`, getHash(test.url))
		})
	}
})
