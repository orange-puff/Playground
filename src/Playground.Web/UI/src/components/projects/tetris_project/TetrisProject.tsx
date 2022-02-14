import Tetris from './Tetris';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        margin: "auto",
        width: "30%",
        border: "3px solid black",
        marginTop: "20px",
        textAlign: "center"
    }
}));

const TetrisProject = () => {
    const styles = useStyles();

    return (
        <div>
            <div className={styles.text}>
                <p>
                    This is a very lacking port of tetris that I built for fun.
                    <br />
                    It should have basic piece movement and functionality.
                </p>
            </div><Tetris />
        </div>);
}

export default TetrisProject;