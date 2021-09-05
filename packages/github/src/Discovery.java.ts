import Utils from "common/dist/Utils.java"
import { Octokit } from "octokit"

export default class Discovery {
    public static async main(args: string[]) {
        const username = args[0]
        const discovery = new Discovery(
            process.env.PERSONAL_ACCESS_TOKEN
        )
        const user = await discovery.findUser(username)
        console.log({ user })
    }

    private api: Octokit

    constructor(token: string) {
        this.api = new Octokit({ auth: token })
    }

    public async findUser(username: string) {
        const [error, response] = await Utils.promise(
            this.api.rest.users.getByUsername({ username })
        )
        if (error) {
            return null
        }
        return response.data
    }
}
