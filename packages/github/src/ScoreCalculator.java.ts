import { Octokit } from "octokit"
import { User } from "./types"
import ExtendedMath from "./ExtendedMath.java"
import Utils from "common/dist/Utils.java"
import Score from "./scores/Score.java"
import FollowersCountScore from "./scores/FollowersCountScore.java"
import OrganizationsCountScore from "./scores/OrganizationsCountScore.java"
import ContributionsLastYearScore from "./scores/ContributionsLastYearScore.java"
import TotalGivenStarsScore from "./scores/TotalGivenStarsScore.java"
import PinnedRepoStarsScore from "./scores/PinnedRepoStarsScore.java"
import IssuesLastYearScore from "./scores/IssuesLastYearScore.java"

export default class ScoreCalculator {
    private static scores: (
        new (...args: ConstructorParameters<typeof Score>) => Score
    )[] = [
        ContributionsLastYearScore,
        TotalGivenStarsScore,
        OrganizationsCountScore,
        FollowersCountScore,
        PinnedRepoStarsScore,
        IssuesLastYearScore
    ]

    private api: Octokit

    public static async main(args: string[]) {
        Utils.debug({ args })
        const username = args[0]
        const scoreCalculator = new ScoreCalculator(
            username,
            process.env.PERSONAL_ACCESS_TOKEN
        )
        Utils.debug({
            score: await scoreCalculator.getScore()
        })
    }

    constructor(private username: string, token: string) {
        this.api = new Octokit({ auth: token })
    }

    public async getScore() {
        const [error, response] = await Utils.promise(
            this.api.rest.users.getByUsername({
                username: this.username
            })
        )
        if (error) {
            throw new Error(`User '${this.username}' not found`)
        }
        const scores = await this.collectScores(response.data)
        Utils.debug({ scores })
        return ExtendedMath.sum(scores)
    }

    private collectScores(user: User) {
        return Promise.all(
            ScoreCalculator.scores.map((Score) => new Score(this.api, user).getScore())
        )
    }
}
