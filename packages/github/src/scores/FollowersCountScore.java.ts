import Score from "./Score.java"

export default class FollowersCountScore extends Score {
    public async getScore() {
        const followers = this.user.followers as number
        const following = this.user.following as number
        return Math.max(Math.log10(followers - following), 0)
    }
}
