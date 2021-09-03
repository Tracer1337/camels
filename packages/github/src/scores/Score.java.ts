import { User } from "../types"

export default abstract class Score {
    constructor(protected user: User) {}

    abstract getScore(): Promise<number>
}
