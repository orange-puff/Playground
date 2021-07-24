import React from 'react';
import {
    AppBar,
    Toolbar
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import HomeIcon from "@material-ui/icons/Home";
import { Link } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton component={Link} to="/">
                    <HomeIcon />
                </IconButton>
                <Button color="inherit" component={Link} to="/projects">Projects</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;