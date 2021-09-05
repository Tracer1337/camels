import Utils from "common/dist/Utils.java"
import Score from "./Score.java"

export default class OrganizationsCountScore extends Score {
    public async getScore() {
        const organizationsCount = await this.fetchOrganizationsCount()
        return Math.min(organizationsCount / 3, 2)
    }

    private async fetchOrganizationsCount() {
        const [error, response] = await Utils.promise(
            this.api.rest.orgs.listForUser({
                per_page: 6,
                username: this.user.login as string
            })
        )
        if (error) {
            throw new Error("Failed to fetch organizations")
        }
        return response.data.length
    }
}
