import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    editor: {
        width: "50%"
    }
}));

enum InputState {
    Neutral = 0,
    Good = 1,
    Bad = -1
}

const JsonProject = () => {
    const styles = useStyles();
    const [input, setInput] = useState<string>('');
    const [inputState, setInputState] = useState<InputState>(InputState.Neutral);
    const numRows: number = 20;

    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                    startIcon={<ClearAllIcon />}
                    onClick={() => setInput('')}
                >
                    Clear
                </Button>
                <Button
                    variant="contained"
                    color={inputState === InputState.Neutral ? "default" : (inputState === InputState.Good ? "primary" : "secondary")}
                    className={styles.button}
                    startIcon={<DoubleArrowIcon />}
                >
                    Validate
                </Button>
            </div>
            <div>
                <TextField
                    multiline
                    rows={numRows}
                    variant="outlined"
                    className={styles.editor}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <TextField
                    multiline
                    rows={numRows}
                    variant="outlined"
                    className={styles.editor}
                />
            </div>
        </div>
    );
}

export default JsonProject;