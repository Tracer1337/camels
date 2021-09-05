import { Avatar, Box, Typography } from "@material-ui/core"
import API from "../api/types"

export default function User({ user }: { user: API.User }) {
    return (
        <Box display="flex" alignItems="center">
            <Box mr={2}>
                <Avatar src={user.avatar_url} alt="Avatar"/>
            </Box>
            <Box>
                <Typography variant="h6">
                    {user.name || user.login}
                </Typography>
                {user.login && (
                    <Typography variant="subtitle2">
                        {user.login}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
