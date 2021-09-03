import cheerio from "cheerio"
import fetch from "node-fetch"
import Score from "./Score.java"

export default class TotalContributionScore extends Score {
    private static readonly CONTRIBUTION_SELECTOR = ".position-relative > h2.f4.text-normal.mb-2"
    
    public async getScore() {
        const contributions = await this.fetchContributions()
        return Math.log10(contributions)
    }

    private async fetchContributions() {
        const res = await fetch(this.user.html_url as string)
        if (res.status !== 200) {
            throw new Error("Failed to fetch contributions")
        }
        const $ = cheerio.load(await res.text())
        const matches = $(TotalContributionScore.CONTRIBUTION_SELECTOR)
            .text().match(/[\d,]+/)
        if (!matches) {
            throw new Error("No contributions found")
        }
        return parseInt(matches[0].replace(/,/g, ""))
    }
}
