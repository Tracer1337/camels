import { makeStyles } from "@material-ui/core"
import camel from "../assets/camel.png"

const useStyles = makeStyles({
    camel: {
        width: 64
    }
})

export default function Camel({ percentage = 1 }: {
    percentage?: number
}) {
    const classes = useStyles()

    const clip = percentage * 100 + "%"

    return (
        <img
            src={camel}
            alt="Camel"
            className={classes.camel}
            style={{
                clipPath: `polygon(0% 0%, ${clip} 0%, ${clip} 100%, 0% 100%)`
            }}
        />
    )
}
