import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const BOX_WIDTH = 900;
const BOX_HEIGHT = 140;
const MIDDLE_BOX_WIDTH = 4;
const WORDS = ["hello", "how", "are", "you", "bye", "bitch", "bye", "more", "words", "because", "I", "need", "them", "okay", "peace"];
const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const useStyles = makeStyles((theme) => ({
    box: {
        width: JSON.stringify(BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        margin: "auto",
        marginTop: "50px",
        backgroundColor: "white",
        color: "black"
    },
    leftBox: {
        width: JSON.stringify(Math.floor(BOX_WIDTH / 2)) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        float: "left",
        overflow: "hidden"
    },
    centerBox: {
        width: JSON.stringify(MIDDLE_BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        float: "right",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        color: "white",
        caretColor: "black",
        fontSize: "30px",
        outline: "none"
    },
    rightBox: {
        width: JSON.stringify(Math.floor(BOX_WIDTH / 2) - 10) + "px",
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
    const [left, setLeft] = useState<string[]>(['']);
    const [right, setRight] = useState<string[]>(WORDS);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    function handleInput(event: any) {
        if (event.key === "Tab") {
            event.preventDefault();
        }
        else if (event.key === "Backspace") {
            const tmp: string[] = [];
            left.forEach(word => tmp.push(word));

            let head: string = tmp[0];
            if (head.length > 0) {
                head = head.substr(0, tmp.length - 1);
            }
            tmp[0] = head;
            setLeft(tmp);
        }
        else if (event.Key === "Enter" || event.KeyCode === 32) {
            console.log("FOUND");
        }
        else if (alph.includes(event.Key)) {

        }
        //console.log(event);
    }

    const styles = useStyles();
    return (
        <div className={styles.box} onClick={() => inputRef.current.focus()}>
            <div className={styles.leftBox}>
                {left.map((val, ind) => <span key={ind} className={styles.word}>{val}</span>)}
                <div className={styles.centerBox} contentEditable={true} onKeyDown={(event) => handleInput(event)} ref={inputRef}>
                </div>
            </div>
            <div className={styles.rightBox}>
                {right.map((val, ind) => <span key={ind} className={styles.word}>{val}</span>)}
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