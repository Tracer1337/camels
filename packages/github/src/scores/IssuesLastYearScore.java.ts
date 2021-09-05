import moment from "moment"
import Utils from "common/dist/Utils.java"
import Score from "./Score.java"

export default class IssuesLastYearScore extends Score {
    public async getScore() {
        const issues = await this.fetchIssuesCount()
        return Math.min(issues / 15, 2)
    }

    private async fetchIssuesCount() {
        const createdQuery = moment()
            .subtract(1, "year")
            .format("YYYY-MM-DD")
        const [error, response] = await Utils.promise(
            this.api.rest.search.issuesAndPullRequests({
                q: `author:${this.user.login}+is:issue+created:>${createdQuery}`,
                per_page: 1
            })
        )
        if (error) {
            throw new Error("Failed to fetch issues")
        }
        return response.data.total_count
    }
}
