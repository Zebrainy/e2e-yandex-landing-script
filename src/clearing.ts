import fs from "fs"
import path from "path"
;(async () => {
	const configMap = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../test_config.map.json"), "utf8")
	) as Record<string, string>

	const foldersToDelete = fs.readdirSync(
		path.join(__dirname, "../../app_snapshots/")
	)

	for (let file of foldersToDelete) {
		if (file in configMap) continue

		fs.rmSync(path.join(__dirname, "../../app_snapshots/", file), {
			recursive: true,
			force: true,
		})
	}
})()
