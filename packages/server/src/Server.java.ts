import express, { Express, Request, Response } from "express"
import cors from "cors"
import ScoreCalculator from "github/dist/ScoreCalculator.java"
import Utils from "common/dist/Utils.java"

export default class Server {
    private static readonly PORT = process.env.PORT

    public static async main(args: string[]) {
        const server = new Server()
        await server.start()
        console.log(`Server running on port ${Server.PORT}`)
    }

    public start(): Promise<void> {
        return new Promise((resolve) => {
            const app = express()
            this.boot(app)
            app.listen(Server.PORT, resolve)
        })
    }

    private boot(app: Express) {
        app.use(cors())
        app.get("/score/github/:username", this.handleGithubScore.bind(this))
    }

    private async handleGithubScore(req: Request, res: Response) {
        const username = req.params.username
        const scoreCalculator = new ScoreCalculator(
            username,
            process.env.PERSONAL_ACCESS_TOKEN
        )
        const [error, score] = await Utils.promise(
            scoreCalculator.getScore()
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
