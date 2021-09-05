import API from "./types"

function url(path: string) {
    return `http://localhost:8080${path}`
}

export async function fetchUser(username: string): Promise<API.User> {
    const res = await fetch(url(`/discovery/github/${username}`))
    const json = await res.json()
    return json.data
}

export async function fetchScore(username: string) {
    const res = await fetch(url(`/score/github/${username}`))
    const json = await res.json()
    return json.data
}
