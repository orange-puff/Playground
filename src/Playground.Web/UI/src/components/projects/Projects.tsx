import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    project: {
        color: "white"
    }
}));

const Projects = () => {
    const styles = useStyles();

    return (
        <div>
            <p>
                My Projects
            </p>
            <ul>
                <li><Button to="/projects/tetris_project" component={Link} className={styles.project}>Tetris Project</Button></li>
                <li><Button to="/projects/typing_project" component={Link} className={styles.project}>Typing Project</Button></li>
                <li><Button to="/projects/tiktaktoe_project" component={Link} className={styles.project}>TikTakToe Project</Button></li>
                <li><Button to="/projects/editor_project" component={Link} className={styles.project}>Editor Project</Button></li>
                <li><Button to="/projects/photo_project" component={Link} className={styles.project}>Photo Project</Button></li>
            </ul>
        </div>
    );
}

export default Projects;
