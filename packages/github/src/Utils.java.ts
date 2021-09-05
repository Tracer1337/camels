import cheerio from "cheerio"
import fetch from "node-fetch"

export default class Utils {
    public static async promise<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
        try {
            return [null, await promise]
        } catch (error) {
            return [error, null]
        }
    }

    public static async fetchCheerio(url: string) {
        const res = await fetch(url)
        if (res.status !== 200) {
            throw new Error("Failed to fetch")
        }
        return cheerio.load(await res.text())
    }

    public static debug(...args: Parameters<typeof console["log"]>) {
        if (process.env.NODE_ENV === "development") {
            console.log(...args)
        }
    }
}
