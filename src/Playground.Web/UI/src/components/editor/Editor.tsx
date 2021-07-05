import React, { useState, useEffect } from 'react';
import './Editor.css';

const MAX_LINE_LENGTH = 100;

interface IEditorProps {
    value: string;
    setValue: useState<string>;
    placeHolder: string;
    readonly: boolean;
}

function Editor(props: React.PropsWithChildren<IEditorProps>) {
    const { value, setValue, placeHolder, readonly } = props;
    const [lineNumbers, setLineNumbers] = useState([1]);
    const [numRows, setNumRows] = useState(1);

    useEffect(() => {
        if (typeof (value) === 'string' && !readonly) {
            handleChange(value);
        }
    }, [value])

    function handleChange(val: string) {
        const splitLines = val.split('\n');

        // if a line has length > MAX_LINE_LENGTH, split it up
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

        setValue(splitLines.join('\n'))
        const numLines = splitLines.length;
        setNumRows(numLines);
        const tmp = [];
        for (let i = 0; i < numLines; i++) {
            tmp.push(i + 1);
        }
        setLineNumbers(tmp);


    }

    return (
        <div className="editor">
            <textarea id="codeArea" placeholder={placeHolder} value={value} onChange={(event) => handleChange(event.target.value)} rows={numRows} cols={MAX_LINE_LENGTH} onKeyDown={(event) => console.log(event)} readOnly={readonly}/>
            <div className="lineNumberColumn">
                {lineNumbers.map(lineNumber => <div className="editorLineNumber" key={lineNumber}>{lineNumber}</div>)}
            </div>
        </div>
    );
}

export default Editor;
