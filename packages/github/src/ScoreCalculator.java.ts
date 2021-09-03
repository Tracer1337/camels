import { Octokit } from "octokit"
import ExtendedMath from "./ExtendedMath.java"
import Score from "./scores/Score.java"
import TotalContributionScore from "./scores/TotalContributionScore.java"
import TotalGivenStarsScore from "./scores/TotalGivenStarsScore.java"
import { User } from "./types"

export default class ScoreCalculator {
    private static scores: (
        new (...args: ConstructorParameters<typeof Score>) => Score
    )[] = [
        TotalContributionScore,
        TotalGivenStarsScore
    ]
    private api = new Octokit()

    public static async main(args: string[]) {
        console.log({ args })
        const username = args[0]
        const scoreCalculator = new ScoreCalculator()
        console.log({
            score: await scoreCalculator.getScore(username)
        })
    }

    public async getScore(username: string) {
        const { data: user } = await this.api.rest.users.getByUsername({
            username
        })
        if (!user) {
            throw new Error(`User '${username}' not found`)
        }
        const scores = await this.collectScores(user)
        console.log({ scores })
        return ExtendedMath.sum(scores)
    }

    private collectScores(user: User) {
        return Promise.all(
            ScoreCalculator.scores.map((Score) => new Score(user).getScore())
        )
    }
}
