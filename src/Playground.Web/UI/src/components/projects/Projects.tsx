import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Projects = () => {
    return (
        <div>
            <p>
                My Projects
            </p>
            <ul>
                <li><Button to="/projects/json_project" component={Link}>Json Project</Button></li>
                <li><Button to="/projects/tiktaktoe_project" component={Link}>TikTakToe Project</Button></li>
                <li><Button to="/projects/typing_project" component={Link}>Typing Project</Button></li>
            </ul>
        </div>
    );
}

export default Projects;
