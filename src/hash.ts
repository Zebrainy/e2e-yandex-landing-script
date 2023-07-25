import crypto from "crypto"

export const getHash = (str: string) => {
	return crypto.createHash("md5").update(str).digest("hex")
}
