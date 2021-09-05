import { Endpoints } from "@octokit/types"

export type User = Endpoints["GET /users/{username}"]["response"]["data"]
export type Repo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]
