import React from 'react';
import './Editor.css';

const Editor = () => {
    return (
        <div className="editor">
            <textarea id="codeArea" placeholder="yo bro" />
            <span className="editorLineNumber">1</span>
            <span className="editorLineNumber">2</span>
            <span className="editorLineNumber">3</span>
            <span className="editorLineNumber">4</span>
        </div>
    );
}

export default Editor;
