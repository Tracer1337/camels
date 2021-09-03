import { Endpoints } from "@octokit/types"

export type User = Endpoints["GET /users/{username}"]["response"]["data"]
