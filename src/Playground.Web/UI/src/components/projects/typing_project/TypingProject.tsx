import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const BOX_WIDTH = 1024;
const BOX_HEIGHT = 140;
const MIDDLE_BOX_WIDTH = 4;
const FONT_SIZE = 40;

const WORDS = ["hello", "how", "are", "you", "bye", "bitch", "bye", "more", "words", "because", "I", "need", "them", "okay", "peace"];
const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const BACKSPACE_KEY_CODE = 8;
const SPACE_KEY_CODE = 32;
const ENTER_KEY_CODE = 13;

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
        caretColor: "black",
        fontSize: JSON.stringify(FONT_SIZE) + "px",
        outline: "none",
        float: "left",
        marginTop: JSON.stringify(Math.floor(BOX_HEIGHT / 2) - Math.floor(FONT_SIZE/2)) + "px"
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
        fontSize: JSON.stringify(FONT_SIZE) + "px",
        fontFamily: "Times New Roman, Times, serif",
        marginTop: JSON.stringify(Math.floor(BOX_HEIGHT / 2) - Math.floor(FONT_SIZE / 2)) + "px",
        float: "left"
    },
    leftWord: {
        height: JSON.stringify(BOX_HEIGHT) + "px",
        marginLeft: "10px",
        fontSize: JSON.stringify(FONT_SIZE) + "px",
        fontFamily: "Times New Roman, Times, serif",
        marginTop: JSON.stringify(Math.floor(BOX_HEIGHT / 2) - Math.floor(FONT_SIZE / 2)) + "px",
        float: "right"
    }
}));

const TypingProject = () => {
    const [left, setLeft] = useState<string[]>(['']);
    const [right, setRight] = useState<string[]>(WORDS);
    const [curr, setCurr] = useState<string>(WORDS[0]);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    function handleInput(event: any) {
        event.preventDefault();

        if (event.keyCode === BACKSPACE_KEY_CODE) {
            const tmp: string[] = [];
            left.forEach(word => tmp.push(word));

            let head: string = tmp[0];
            if (head.length === 0) {
                return;
            }

            const isSub: boolean = curr.indexOf(head) === 0;
            if (isSub) {
                const tmpRight: string[] = [];
                right.forEach(word => tmpRight.push(word));

                tmpRight[0] = head[head.length - 1] + right[0];
                setRight(tmpRight);
            }

            head = head.substr(0, head.length - 1);
            tmp[0] = head;
            setLeft(tmp);
        }
        else if (event.keyCode === SPACE_KEY_CODE || event.keyCode === ENTER_KEY_CODE) {
            const tmpLeft: string[] = [];
            left.forEach(word => tmpLeft.push(word));

            if (tmpLeft[0].length === 0) {
                return;
            }
            tmpLeft.splice(0, 0, '');
            setLeft(tmpLeft);

            const tmpRight: string[] = [];
            right.forEach(word => tmpRight.push(word));
            tmpRight.splice(0, 1);
            setRight(tmpRight);

            setCurr(tmpRight[0]);
        }
        else if (alph.includes(event.key)) {
            const tmpLeft: string[] = [];
            left.forEach(word => tmpLeft.push(word));

            tmpLeft[0] = tmpLeft[0] + event.key;
            setLeft(tmpLeft);

            const tmpRight: string[] = [];
            right.forEach(word => tmpRight.push(word));
            if (curr.indexOf(tmpLeft[0]) === 0) {
                tmpRight[0] = tmpRight[0].substr(1, tmpRight[0].length);
                setRight(tmpRight);
            }

            console.log(tmpRight);
        }
    }

    const styles = useStyles();
    return (
        <div className={styles.box} onClick={() => inputRef.current.focus()}>
            <div className={styles.leftBox}>
                {left.map((val, ind) => <span key={ind} className={styles.leftWord}>{val}</span>)}
            </div>
            <div className={styles.centerBox} contentEditable={true} onKeyDown={(event) => handleInput(event)} ref={inputRef}>
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