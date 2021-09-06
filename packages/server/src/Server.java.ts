import express, { Express, Request, Response } from "express"
import cors from "cors"
import ScoreCalculator from "github/dist/ScoreCalculator.java"
import Discovery from "github/dist/Discovery.java"
import Utils from "common/dist/Utils.java"

export default class Server {
    private static readonly PORT = process.env.PORT

    public static async main(args: string[]) {
        const server = new Server()
        await server.start()
        console.log(`Server running on port ${Server.PORT}`)
    }
    
    private discovery = new Discovery(
        process.env.PERSONAL_ACCESS_TOKEN
    )
    private scoreCalculator = new ScoreCalculator(
        process.env.PERSONAL_ACCESS_TOKEN
    )

    public start(): Promise<void> {
        return new Promise((resolve) => {
            const app = express()
            this.boot(app)
            app.listen(Server.PORT, resolve)
        })
    }

    private boot(app: Express) {
        app.use(cors())
        app.get(
            "/discovery/github/:username",
            this.handleGithubUserDiscovery.bind(this)
        )
        app.get(
            "/score/github/:username",
            this.validateUsername.bind(this),
            this.handleGithubScore.bind(this)
        )
    }

    private async validateUsername(req: Request, res: Response, next: Function) {
        const username = req.params.username
        const user = await this.discovery.findUser(username)
        if (!user) {
            return void res.sendStatus(404)
        }
        next()
    }

    private async handleGithubUserDiscovery(req: Request, res: Response) {
        const username = req.params.username
        const user = await this.discovery.findUser(username)
        res.send({
            data: user
        })
    }

    private async handleGithubScore(req: Request, res: Response) {
        const username = req.params.username
        const [error, score] = await Utils.promise(
            this.scoreCalculator.getScore(username)
        )
        if (error) {
            console.error(error)
            return void res.sendStatus(500)
        }
        res.send({
            data: score
        })
    }
}
