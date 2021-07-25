import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const BOX_WIDTH = 900;
const BOX_HEIGHT = 140;
const MIDDLE_BOX_WIDTH = 5;
const WORDS = ["hello", "how", "are", "you", "bye", "bitch", "bye", "more", "words", "because", "I", "need", "them", "okay", "peace"];

const useStyles = makeStyles((theme) => ({
    box: {
        border: "3px solid white",
        width: JSON.stringify(BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        margin: "auto",
        marginTop: "50px",
        backgroundColor: "white",
        color: "black"
    },
    leftBox: {
        border: "1px solid black",
        width: JSON.stringify(Math.floor(BOX_WIDTH / 2)) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        float: "left",
    },
    centerBox: {
        border: "1px solid red",
        width: JSON.stringify(MIDDLE_BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        float: "left"
    },
    rightBox: {
        border: "1px solid blue",
        width: JSON.stringify(Math.floor(BOX_WIDTH / 2) - 3 * MIDDLE_BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        float: "left",
        overflow: "hidden"
    },
    word: {
        height: JSON.stringify(BOX_HEIGHT) + "px",
        marginRight: "10px",
        fontSize: "40px",
        fontFamily: "Times New Roman, Times, serif",
        display: "inline-flex",
        alignItems: "center"
    }
}));

const TypingProject = () => {
    const [left, setLeft] = useState<string[]>([]);
    const [right, setRight] = useState<string[]>(WORDS);

    const styles = useStyles();
    return (
        <div className={styles.box}>
            <div className={styles.leftBox}>
                {left.map(val => <span className={styles.word}>{val}</span>)}
            </div>
            <div className={styles.centerBox} contentEditable={true}>
            </div>
            <div className={styles.rightBox}>
                {right.map(val => <span className={styles.word}>{val}</span>)}
            </div>
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