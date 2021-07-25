import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const BOX_WIDTH = 900;
const BOX_HEIGHT = 140;
const MIDDLE_BOX_WIDTH = 5;

const useStyles = makeStyles((theme) => ({
    box: {
        border: "3px solid white",
        width: JSON.stringify(BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        margin: "auto",
        marginTop: "50px",
        backgroundColor: "white",
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
        float: "left"
    }
}));

const TypingProject = () => {
    const styles = useStyles();
    return (
        <div className={styles.box}>
            <div className={styles.leftBox}>
            </div>
            <div className={styles.centerBox}>
            </div>
            <div className={styles.rightBox}>
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