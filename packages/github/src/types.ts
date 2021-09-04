import { Endpoints } from "@octokit/types"

export type User = Endpoints["GET /users/{username}"]["response"]["data"]
export type Repos = Endpoints["GET /users/{username}/repos"]["response"]["data"]
