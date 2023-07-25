import { Page } from "playwright"
import { toMatchImageSnapshot } from "jest-image-snapshot"

expect.extend({ toMatchImageSnapshot })

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const takeScreenshot = async (dir: string) => {
	const filename = "screen"
	const snapFolder = process.env.LANDING_URL_HASH
	expect(
		await page.screenshot({
			fullPage: false,
			path: `./app_snapshots/${snapFolder}/received/${dir}/${filename}-snap.png`,
		})
	).toMatchImageSnapshot({
		customSnapshotIdentifier: filename,
		customSnapshotsDir: `./app_snapshots/${snapFolder}/base/` + dir,
		customDiffDir: `./app_snapshots/${snapFolder}/diff/` + dir,
		failureThreshold: 0.005,
		failureThresholdType: "percent",
	})
}

const openPage = async (page: Page, url: string) => {
	await page.setExtraHTTPHeaders({
		Authorization: `OAuth ${process.env.YANDEX_TOKEN}`,
	})
	await page.goto(url, {
		timeout: 10000,
	})
}

describe("Test", () => {
	it("First page", async () => {
		await openPage(page, `${process.env.LANDING_URL}`)
		await page.waitForLoadState("domcontentloaded")
		await sleep(parseInt(process.env.DELAY_BEFORE_SCREENSHOT_MS || "2000"))
		await takeScreenshot(`${deviceName}`)
	})
})
