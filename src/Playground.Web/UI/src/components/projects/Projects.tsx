import React from 'react';
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
                <li><Button to="/projects/json_project" component={Link} className={styles.project}>Json Project</Button></li>
                <li><Button to="/projects/tiktaktoe_project" component={Link} className={styles.project}>TikTakToe Project</Button></li>
                <li><Button to="/projects/typing_project" component={Link} className={styles.project}>Typing Project</Button></li>
                <li><Button to="/projects/digit_project" component={Link} className={styles.project}>Digit Project</Button></li>
            </ul>
        </div>
    );
}

export default Projects;
