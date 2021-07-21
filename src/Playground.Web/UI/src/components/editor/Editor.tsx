import React, { useState, useEffect } from 'react';
import './Editor.css';

const MAX_LINE_LENGTH = 100;

interface IEditorProps {
    value: string;
    setValue: any;
    placeHolder: string;
    readonly: boolean;
}

const handleChange = (val: string): [string, number, number[]] => {
    const splitLines = val.split('\n');

    /* if a line has length > MAX_LINE_LENGTH, split it up */
    for (let i = 0; i < splitLines.length; i++) {
        if (splitLines[i].length <= MAX_LINE_LENGTH) {
            continue;
        }
        const tmp: Array<string> = [];
        for (let j = 0; j < Math.ceil(splitLines[i].length / MAX_LINE_LENGTH); j++) {
            tmp.push(splitLines[i].substring(j * MAX_LINE_LENGTH, (j + 1) * MAX_LINE_LENGTH));
        }
        splitLines[i] = tmp[tmp.length - 1];
        for (let j = tmp.length - 2; j >= 0; j--) {
            splitLines.splice(i, 0, tmp[j]);
        }
    }
    const numLines = splitLines.length;
    const tmp = [];
    for (let i = 0; i < numLines; i++) {
        tmp.push(i + 1);
    }

    const value = splitLines.join('\n');
    return [value, numLines, tmp];
}

const Editor = (props: React.PropsWithChildren<IEditorProps>) => {
    const { value, setValue, placeHolder, readonly } = props;
    const [numRows, setNumRows] = useState(1);
    const [lineNumbers, setLineNumbers] = useState([1]);

    useEffect(() => {
        if (typeof (value) === 'string') {
            const [val, nr, ln]: [string, number, number[]] = handleChange(value);
            setValue(val);
            setNumRows(nr);
            setLineNumbers(ln);
        }
    }, [value, setValue, setNumRows, setLineNumbers]);

    return (
        <div className="editor">
            <textarea id="codeArea" placeholder={placeHolder} value={value} onChange={(event) => {
                const [val, nr, ln]: [string, number, number[]] = handleChange(event.target.value);
                setValue(val);
                setNumRows(nr);
                setLineNumbers(ln);
            }
            } rows={numRows} cols={MAX_LINE_LENGTH} readOnly={readonly} />
            <div className="lineNumberColumn">
                {lineNumbers.map(lineNumber => <div className="editorLineNumber" key={lineNumber}>{lineNumber}</div>)}
            </div>
        </div>
    );
}

export default Editor;
