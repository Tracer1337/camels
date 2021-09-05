import ExtendedMath from "../ExtendedMath.java"
import Utils from "common/dist/Utils.java"
import Score from "./Score.java"

export default class PinnedRepoStarsScore extends Score {
    private static readonly PINNED_REPOS_SELECTOR = ".js-pinned-items-reorder-container > ol > li"
    private static readonly LINK_SELECTOR = "a.text-bold"

    public async getScore() {
        const totalStars = await this.fetchTotalPinnedStars()
        return ExtendedMath.safeLog10(totalStars)
    }

    private async fetchTotalPinnedStars() {
        const urls = await this.fetchPinnedRepoUrls()
        const repos = await Promise.all(
            urls.map((url) => this.fetchRepo(url))
        )
        const stars = repos
            .filter((repo) => repo.owner.login === this.user.login)
            .map((repo) => repo.stargazers_count)
        return ExtendedMath.sum(stars)
    }

    private async fetchPinnedRepoUrls() {
        const $ = await Utils.fetchCheerio(this.user.html_url as string)
        const pinnedRepos = $(PinnedRepoStarsScore.PINNED_REPOS_SELECTOR)
        if (!pinnedRepos || pinnedRepos.length === 0) {
            return []
        }
        return $(pinnedRepos)
            .find(PinnedRepoStarsScore.LINK_SELECTOR)
            .map((_i, a) => $(a).attr("href"))
            .get() as string[]
    }

    private async fetchRepo(url: string) {
        const { owner, repo } = this.parseRepoUrl(url)
        const [error, response] = await Utils.promise(
            this.api.rest.repos.get({ owner, repo })
        )
        if (error) {
            throw new Error(`Failed to fetch repository ${repo} of user ${owner}`)
        }
        return response.data
    }

    private parseRepoUrl(url: string) {
        const [_, owner, repo] = url.match(/\/(.*)\/(.*)/)
        return { owner, repo }
    }
}
