import Utils from "common/dist/Utils.java"
import Score from "./Score.java"

export default class TotalGivenStarsScore extends Score {
    private readonly SELECTOR = `a[href="https://github.com/${this.user.login}?tab=stars"] > span`

    public async getScore() {
        const stars = await this.fetchStars()
        return Math.min(stars / 500, 1)
    }

    private async fetchStars() {
        const $ = await Utils.fetchCheerio(this.user.html_url as string)
        const text = $(this.SELECTOR).text()
        if (!text) {
            throw new Error("No text found")
        }
        return parseInt(text)
    }
}
