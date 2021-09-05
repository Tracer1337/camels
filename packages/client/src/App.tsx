import {
    Box,
    Container,
    makeStyles
} from "@material-ui/core"
import background from "./assets/background.jpg"
import Footer from "./components/Footer"
import Form from "./components/Form"
import Header from "./components/Header"

const useStyles = makeStyles({
    "@global": {
        html: {
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: "cover"
        },
        "#root": {
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)"
        }
    }
})

export default function App() {
    useStyles()
    
    return (
        <Container>
            <Box mt={6} mb={12}>
                <Header/>
            </Box>
            <Box mb={40}>
                <Form/>
            </Box>
            <Footer/>
        </Container>
    )
}
