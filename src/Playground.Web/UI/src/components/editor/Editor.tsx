import React, { useState } from 'react';
import './Editor.css';

const Editor = () => {
    const [input, setInput] = useState<string>('');
    const [lineNumbers, setLineNumbers] = useState([1]);
    const [numRows, setNumRows] = useState(1);

    function handleChange(val: string) {
        setInput(val);
        const numLines = val.split('\n').length;
        setNumRows(numLines);
        const tmp = [];
        for (let i = 0; i < numLines; i++) {
            tmp.push(i + 1);
        }
        setLineNumbers(tmp);
    }
    return (
        <div className="editor">
            <textarea id="codeArea" placeholder="yo bro" value={input} onChange={(event) => handleChange(event.target.value)} rows={numRows}/>
            <div className="lineNumberColumn">
                {lineNumbers.map(lineNumber => <div className="editorLineNumber" key={lineNumber}>{lineNumber}</div>)}
            </div>
        </div>
    );
}

export default Editor;
