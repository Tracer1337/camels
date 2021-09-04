import { Repos } from "../types"
import Score from "./Score.java"

export default class RepositoryCommitsScore extends Score {
    public async getScore() {
        const totalContributions = await this.fetchTotalContributions()
        return totalContributions / 1000
    }

    private async fetchTotalContributions() {
        const iterator = this.api.paginate.iterator(this.api.rest.repos.listForUser, {
            username: this.user.login as string,
            per_page: 100
        })
        let contributions = 0
        for await (const { data: repos } of iterator) {
            for (const repo of repos) {
                console.log(`Fetching contributions for ${repo.name}`)
                const res = await this.fetchContributionsForRepo(repo)
                contributions += res
            }
        }
        return contributions
    }

    private async fetchContributionsForRepo(repo: Repos[number]) {
        const iterator = this.api.paginate.iterator(this.api.rest.repos.listContributors, {
            owner: this.user.login as string,
            repo: repo.name,
            per_page: 20
        })
        for await (const { data: contributors } of iterator) {
            for (const contributor of contributors) {
                if (contributor.login === this.user.login) {
                    return contributor.contributions
                }
            }
        }
        return 0
    }
}
