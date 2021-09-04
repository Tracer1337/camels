import fetch from "node-fetch"
import Score from "./Score.java"

export default class OrganizationsCountScore extends Score {
    public async getScore() {
        const organizationsCount = await this.fetchOrganizationsCount()
        return Math.min(organizationsCount / 3, 2)
    }

    private async fetchOrganizationsCount() {
        const res = await fetch(this.user.organizations_url as string)
        if (res.status !== 200) {
            throw new Error("Failed to fetch organizations")
        }
        const orgs = await res.json()
        return orgs.length
    }
}
