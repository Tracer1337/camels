import { Octokit } from "octokit"
import ExtendedMath from "./ExtendedMath.java"
import OrganizationsCountScore from "./scores/OrganizationsCountScore.java"
import Score from "./scores/Score.java"
import TotalContributionScore from "./scores/TotalContributionScore.java"
import TotalGivenStarsScore from "./scores/TotalGivenStarsScore.java"
import { User } from "./types"
import Utils from "./Utils.java"

export default class ScoreCalculator {
    private static scores: (
        new (...args: ConstructorParameters<typeof Score>) => Score
    )[] = [
        TotalContributionScore,
        TotalGivenStarsScore,
        OrganizationsCountScore
    ]
    private api = new Octokit()

    public static async main(args: string[]) {
        console.log({ args })
        const username = args[0]
        const scoreCalculator = new ScoreCalculator(username)
        console.log({
            score: await scoreCalculator.getScore()
        })
    }

    constructor(private username: string) {}

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
        console.log({ scores })
        return ExtendedMath.sum(scores)
    }

    private collectScores(user: User) {
        return Promise.all(
            ScoreCalculator.scores.map((Score) => new Score(user).getScore())
        )
    }
}
