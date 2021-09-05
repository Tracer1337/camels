import { Box, Typography } from "@material-ui/core"
import API from "../api/types"
import Camel from "./Camel"
import User from "./User"

export default function Score({ user, score }: {
    user: API.User,
    score: number
}) {
    const images = Array(Math.floor(score))
        .fill(0)
        .map((_, i) => <Camel key={i}/>)

    const rest = score % 1
    if (rest !== 0) {
        images.push(
            <Camel
                key={images.length}
                percentage={score % 1}
            />
        )
    }

    return (
        <Box>
            <Box mb={2}>
                <User user={user}/>
            </Box>
            <Box mb={2}>
                <Typography variant="h6">
                    Your GitHub account is worth <strong>{score.toFixed(1)}</strong> camels!
                </Typography>
            </Box>
            <Box>
                {images}
            </Box>
        </Box>
    )
}
