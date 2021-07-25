import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

const TypingProject = () => {
    return (
        <div>
            <p>Typing</p>
        </div>
    );
}

export default TypingProject;

/*
 * A complete copy of https://www.livechat.com/typing-speed-test/#/
 * Outer div is the entire box
 * Left div which is left half
 * Right div which is right half
 * Middle div which is tiny and just for the caret
 *
 * The right div contains a series of spans, each span contains a word
 * As the user types, correct letters get erased from head of right div and added to tail of left div
 * 
 * */