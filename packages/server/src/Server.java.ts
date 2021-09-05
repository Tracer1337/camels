import express, { Express, Request, Response } from "express"
import cors from "cors"
import ScoreCalculator from "github/dist/ScoreCalculator.java"

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
        try {
            const username = req.params.username
            const scoreCalculator = new ScoreCalculator(
                username,
                process.env.PERSONAL_ACCESS_TOKEN
            )
            const score = await scoreCalculator.getScore()
            res.send({
                data: score
            })
        } catch {
            res.sendStatus(500)
        }
    }
}
