import cheerio from "cheerio"
import fetch from "node-fetch"
import Score from "./Score.java"

export default class TotalGivenStarsScore extends Score {
    private readonly SELECTOR = `a[href="https://github.com/${this.user.login}?tab=stars"] > span`

    public async getScore() {
        const stars = await this.fetchStars()
        return Math.min(stars / 500, 1)
    }

    private async fetchStars() {
        const res = await fetch(this.user.html_url as string)
        if (res.status !== 200) {
            throw new Error("Failed to fetch stars")
        }
        const $ = cheerio.load(await res.text())
        const text = $(this.SELECTOR).text()
        if (!text) {
            throw new Error("No text found")
        }
        return parseInt(text)
    }
}
