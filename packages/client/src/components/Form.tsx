import {
    Paper,
    Box,
    Grid,
    makeStyles,
    TextField,
    ButtonBase,
    CircularProgress
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { fetchScore, fetchUser } from "../api"
import API from "../api/types"
import Score from "./Score"
import User from "./User"

const useStyles = makeStyles({
    input: {
        background: "white",
        borderRadius: 4
    },
    paperButton: {
        display: "block",
        textAlign: "initial",
        width: "100%"
    }
})

export default function Form() {
    const classes = useStyles()

    const [username, setUsername] = useState("")
    const [user, setUser] = useState<API.User>()
    const [score, setScore] = useState<number>()
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const [isLoadingScore, setIsLoadingScore] = useState(false)

    const userDiscoveryTimeout = useRef<number>()

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }

    const handleUserClick = async () => {
        if (isLoadingScore) {
            return
        }
        setScore(undefined)
        setIsLoadingScore(true)
        const score = await fetchScore(username)
        setIsLoadingScore(false)
        setScore(score)
    }

    const handleUserDiscovery = async () => {
        setUser(undefined)
        setScore(undefined)
        if (!username) {
            return
        }
        setIsLoadingUser(true)
        const user = await fetchUser(username)
        setIsLoadingUser(false)
        setUser(user)
    }

    const scheduleUserDiscovery = () => {
        clearTimeout(userDiscoveryTimeout.current)
        // @ts-ignore
        userDiscoveryTimeout.current = setTimeout(handleUserDiscovery, 250)
    }

    useEffect(scheduleUserDiscovery, [username])

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md>
                <Box mb={4}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Username..."
                        value={username}
                        onChange={handleUsernameChange}
                        className={classes.input}
                        fullWidth
                    />
                </Box>

                { isLoadingUser && <CircularProgress/> }

                { username && !isLoadingUser && !user && (
                    <Alert severity="warning">User not found</Alert>
                ) }

                { user && (
                    <ButtonBase
                        className={classes.paperButton}
                        onClick={handleUserClick}
                    >
                        <Paper variant="outlined">
                            <Box p={2}>
                                <User user={user}/>
                            </Box>
                        </Paper>
                    </ButtonBase>
                ) }
            </Grid>
            <Grid item xs={12} md>
                { isLoadingScore && <CircularProgress/> }

                { score !== undefined && user && (
                    <Score user={user} score={score} />
                ) }
            </Grid>
        </Grid>
    )
}
