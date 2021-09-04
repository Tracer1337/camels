import ExtendedMath from "../ExtendedMath.java"
import Score from "./Score.java"

export default class RepositoryStarsScore extends Score {
    public async getScore() {
        const totalStarContribution = await this.fetchTotalStarContribution()
        return ExtendedMath.safeLog10(totalStarContribution)
    }

    private async fetchTotalStarContribution() {
        const iterator = this.api.paginate.iterator(this.api.rest.repos.listForUser, {
            username: this.user.login as string,
            per_page: 100
        })
        let starContribution = 1
        for await (const { data: repos } of iterator) {
            for (const repo of repos) {
                console.log(`Fetching stars for ${repo.name}`)
                // const res = await this.fetchStarsForRepo(repo)
                const res = 0
                starContribution += res
            }
        }
        return starContribution
    }
}
