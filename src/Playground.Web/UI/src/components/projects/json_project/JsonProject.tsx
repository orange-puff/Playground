import React from 'react'
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const JsonProject = () => {
    const styles = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={styles.button}
                startIcon={<ClearAllIcon />}
            >
                Clear
            </Button>
            <Button
                variant="contained"
                className={styles.button}
                startIcon={<DoubleArrowIcon/>}
            >
                Validate
            </Button>
        </div>
    )
}

export default JsonProject