import { Octokit } from "octokit"
import { User } from "../types"

export default abstract class Score {
    constructor(protected api: Octokit, protected user: User) {}

    abstract getScore(): Promise<number>
}
