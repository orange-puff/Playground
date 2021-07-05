import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import HomeIcon from "@material-ui/icons/Home";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <HomeIcon />
                <Button color="inherit" component={Link} to="/projects">Projects</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;