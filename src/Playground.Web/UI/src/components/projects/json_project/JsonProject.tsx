import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Editor from '../../editor/Editor';
import './JsonProject.css';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    title: {
        textAlign: 'center'
    }
}));

interface IErrorBoxProps {
    error: string;
}

const ErrorBox = (props: React.PropsWithChildren<IErrorBoxProps>) => {
    const { error } = props;
    return (
        <div className="errorBox">
            <div className="errorColumn">
                <Typography variant="h6">
                    Error:
                </Typography>
            </div>
            <div className="errorBody">
                <pre>{error}</pre>
            </div>
        </div>
    );
}

const JsonProject = () => {
    const styles = useStyles();
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');

    return (
        <div>
            <Typography variant="h6" component="h6" gutterBottom className={styles.title}>
                I am not sure what to do with this yet, but I built a very basic editor with line numbering.
            </Typography>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                    startIcon={<ClearAllIcon />}
                    onClick={() => { setInput(''); setOutput(''); setError(''); }}
                >
                    Clear
                </Button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Editor value={input} setValue={setInput} placeHolder='input' readonly={false} />
            </div>
            {error === '' ? <p></p> : <ErrorBox error={error} />}
        </div>
    );
}

export default JsonProject;