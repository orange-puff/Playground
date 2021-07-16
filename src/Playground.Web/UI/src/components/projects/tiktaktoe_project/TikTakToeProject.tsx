import React from 'react';
import TikTakToe from './TikTakToe';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center'
    }
}));

const TikTakToeProject = () => {
    const styles = useStyles();

    return (
        <div>
            <Typography variant="h3" component="h3" gutterBottom className={styles.title}>
                TikTakToe Project
            </Typography>
            <TikTakToe n={4} />
        </div>
    );
}

export default TikTakToeProject;