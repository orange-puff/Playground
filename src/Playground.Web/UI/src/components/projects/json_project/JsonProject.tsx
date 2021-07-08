﻿import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Editor from '../../editor/Editor';
import { request } from 'https';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    title: {
        textAlign: 'center'
    }
}));

enum InputState {
    Neutral = 0,
    Good = 1,
    Bad = -1
}

interface IJsonProjectModel {
    json: string;
}

interface IErrorBoxProps {
    error: string;
}

const ErrorBox = (props: React.PropsWithChildren<IErrorBoxProps>) => {
    const { error } = props;
    return (
        <div className="errorBox">
            <pre>{error}</pre>
        </div>
    );
}

const JsonProject = () => {
    const styles = useStyles();
    const [input, setInput] = useState<string>('');
    const [inputState, setInputState] = useState<InputState>(InputState.Neutral);
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');

    function validate() {
        const body: IJsonProjectModel = { json: input };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch('/api/projects/json_project', requestOptions)
            .then(res => res.json())
            .then(data => 'error' in data ? setError(data.error) : setOutput(data.json))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Typography variant="h3" component="h3" gutterBottom className={styles.title}>
                Json Project
            </Typography>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                    startIcon={<ClearAllIcon />}
                    onClick={() => { setInput(''); setOutput(''); }}
                >
                    Clear
                </Button>
                <Button
                    variant="contained"
                    color={inputState === InputState.Neutral ? "default" : (inputState === InputState.Good ? "primary" : "secondary")}
                    className={styles.button}
                    startIcon={<DoubleArrowIcon />}
                    onClick={validate}
                >
                    Validate
                </Button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Editor value={input} setValue={setInput} placeHolder='input' readonly={false} />
                <Editor value={output} setValue={setOutput} placeHolder='output' readonly={true} />
            </div>
            {error == '' ? <p></p> : <ErrorBox error={error} />}
        </div>
    );
}

export default JsonProject;