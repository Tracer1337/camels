import ExtendedMath from "../ExtendedMath.java"
import Utils from "common/dist/Utils.java"
import Score from "./Score.java"

export default class ContributionsLastYearScore extends Score {
    private static readonly SELECTOR = ".position-relative > h2.f4.text-normal.mb-2"
    
    public async getScore() {
        const contributions = await this.fetchContributions()
        return ExtendedMath.safeLog10(contributions)
    }

    private async fetchContributions() {
        const $ = await Utils.fetchCheerio(this.user.html_url as string)
        const matches = $(ContributionsLastYearScore.SELECTOR)
            .text().match(/[\d,]+/)
        if (!matches) {
            throw new Error("No contributions found")
        }
        return parseInt(matches[0].replace(/,/g, ""))
    }
}
