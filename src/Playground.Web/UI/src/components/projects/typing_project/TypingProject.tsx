import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import WORDS from './words';

const BOX_WIDTH = 1024;
const BOX_HEIGHT = 140;
const MIDDLE_BOX_WIDTH = 4;
const FONT_SIZE = 40;
const BANNER_BOX_HEIGHT = 125;

const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const BACKSPACE_KEY_CODE = 8;
const SPACE_KEY_CODE = 32;
const ENTER_KEY_CODE = 13;
const GOOD_STYLE = { color: 'blue' };
const BAD_STYLE = { textDecoration: 'line-through' };

const useStyles = makeStyles((theme) => ({
    body: {
        margin: "auto",
        width: "80%"
    },
    title: {
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center"
    },
    box: {
        width: JSON.stringify(BOX_WIDTH) + "px",
        height: JSON.stringify(BOX_HEIGHT) + "px",
        marginTop: "50px",
        margin: "auto",
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
        marginTop: JSON.stringify(Math.floor(BOX_HEIGHT / 2) - Math.floor(FONT_SIZE / 2)) + "px"
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
    },
    bannerBox: {
        height: JSON.stringify(BANNER_BOX_HEIGHT) + "px",
        width: "650px",
        margin: "auto"
    },
    bannerEntry: {
        height: JSON.stringify(BANNER_BOX_HEIGHT) + "px",
        width: "100px",
        float: "right",
        marginLeft: "15px"
    },
    bannerEntryTop: {
        height: JSON.stringify(BANNER_BOX_HEIGHT - 20) + "px",
        width: "100px",
        border: "1px solid white",
        fontSize: "40px",
        textAlign: "center",
        lineHeight: JSON.stringify(BANNER_BOX_HEIGHT - 20) + "px",
        borderRadius: "25px"
    },
    bannerEntryBottom: {
        height: JSON.stringify(20) + "px",
        width: "100px",
        fontFamily: "Times New Roman, Times, serif",
        textAlign: "center"
    },
    modal: {
        color: "black",
        position: "fixed",
        border: "1px solid #ccc",
        background: "#fff",
        overflow: "auto",
        borderRadius: "4px",
        outline: "none",
        padding: "20px",
        height: "20%",
        width: "20%",
        margin: "auto"
    }
}));

const getRandomWords = (n: number) => {
    const s: Set<number> = new Set();
    while (s.size !== n) {
        s.add(Math.floor((Math.random() * WORDS.length)));
    }

    const toRet: string[] = [];
    s.forEach(ind => toRet.push(WORDS[ind]));
    return toRet;
}

const TypingProject = () => {
    const [left, setLeft] = useState<string[]>(['']);
    const [leftStyles, setLeftStyles] = useState([GOOD_STYLE]);
    const wordsSub: string[] = getRandomWords(300);
    const [right, setRight] = useState<string[]>(wordsSub);
    const [curr, setCurr] = useState<string>(wordsSub[0]);
    const [goodWords, setGoodWords] = useState<number>(0);
    const [goodChars, setGoodChars] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(100.0);
    const [totalWords, setTotalWords] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const inputRef = useRef(null);
    const [timeInterval, setTimeInterval] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        inputRef.current.focus();
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            setModalOpen(true);
        }
    }, [timeLeft, timeInterval]);

    function reset() {
        setLeft(['']);
        setLeftStyles([GOOD_STYLE]);
        const wordsSub: string[] = getRandomWords(300);
        setRight(wordsSub);
        setCurr(wordsSub[0]);
        setGoodWords(0);
        setGoodChars(0);
        setAccuracy(100.0);
        setTotalWords(0);
        setStarted(false);
        setTimeLeft(60);
        setTimeInterval(null);
    }

    function handleInput(event: any) {
        event.preventDefault();
        if (!started && alph.includes(event.key)) {
            setStarted(true);
            const t = setInterval(() => {
                setTimeLeft((oldTimeLeft) => {
                    return oldTimeLeft - 1;
                });
            }, 1000);
            setTimeInterval(t);
        }

        if ((event.keyCode !== BACKSPACE_KEY_CODE && event.keyCode !== SPACE_KEY_CODE && event.keyCode !== ENTER_KEY_CODE && !alph.includes(event.key)) || timeLeft <= 0) {
            return;
        }

        const tmpLeft: string[] = [];
        left.forEach(word => tmpLeft.push(word));
        const tmpRight: string[] = [];
        right.forEach(word => tmpRight.push(word));
        const tmpStyles: any[] = [];
        leftStyles.forEach(style => tmpStyles.push(style));
        let tmpGoodWords = goodWords;
        let tmpGoodChars = goodChars;
        let tmpAccuracy = accuracy;
        let tmpTotalWords = totalWords;
        let tmpCurr = curr;
        let isSub: boolean = false;

        let head: string = tmpLeft[0];

        if (event.keyCode === BACKSPACE_KEY_CODE) {
            if (head.length === 0) {
                return;
            }

            if (curr.indexOf(tmpLeft[0]) === 0) {
                tmpRight[0] = head[head.length - 1] + right[0];
            }

            head = head.substr(0, head.length - 1);
            tmpLeft[0] = head;

            isSub = curr.indexOf(head) === 0;
        }
        else if (event.keyCode === SPACE_KEY_CODE || event.keyCode === ENTER_KEY_CODE) {
            if (tmpLeft[0].length === 0) {
                return;
            }
            tmpTotalWords += 1;
            if (tmpLeft[0] === curr) {
                tmpGoodWords += 1;
                tmpGoodChars += curr.length;
            }
            else {
                tmpStyles[0] = BAD_STYLE;
            }
            tmpAccuracy = ((tmpGoodWords * 100) / tmpTotalWords).toFixed(0);

            tmpLeft.splice(0, 0, '');
            tmpStyles.splice(0, 0, GOOD_STYLE);
            tmpRight.splice(0, 1);
            tmpCurr = tmpRight[0];
        }
        else if (alph.includes(event.key)) {
            head = head + event.key;
            tmpLeft[0] = head;

            isSub = curr.indexOf(tmpLeft[0]) === 0;
            if (isSub) {
                tmpRight[0] = tmpRight[0].substr(1, tmpRight[0].length);
                setRight(tmpRight);
            }
        }

        if (isSub) {
            tmpStyles[0] = GOOD_STYLE;
        }
        else {
            tmpStyles[0] = BAD_STYLE;
        }

        if (timeLeft > 0) {
            setLeft(tmpLeft);
            setRight(tmpRight);
            setLeftStyles(tmpStyles);
            setCurr(tmpCurr);
            setGoodWords(tmpGoodWords);
            setGoodChars(tmpGoodChars);
            setAccuracy(tmpAccuracy);
            setTotalWords(tmpTotalWords);
        }
    }

    const styles = useStyles();
    return (
        <div className={styles.body}>
            <Typography variant="h3" component="h3" gutterBottom className={styles.title}>
                Test Your Typing Speed
            </Typography>
            <div className={styles.bannerBox}>
                <div className={styles.bannerEntry}>
                    <div className={styles.bannerEntryTop}>
                        {accuracy}
                    </div>
                    <div className={styles.bannerEntryBottom}>
                        % Accuracy
                    </div>
                </div>
                <div className={styles.bannerEntry}>
                    <div className={styles.bannerEntryTop}>
                        {goodChars}
                    </div>
                    <div className={styles.bannerEntryBottom}>
                        Chars / Min
                    </div>
                </div>
                <div className={styles.bannerEntry}>
                    <div className={styles.bannerEntryTop}>
                        {goodWords}
                    </div>
                    <div className={styles.bannerEntryBottom}>
                        Words / Min
                    </div>
                </div>
                <div className={styles.bannerEntry} style={{ float: "left" }}>
                    <div className={styles.bannerEntryTop} style={{ color: "red" }}>
                        {timeLeft}
                    </div>
                    <div className={styles.bannerEntryBottom}>
                        Seconds
                    </div>
                </div>
            </div>
            <div className={styles.box} onClick={() => inputRef.current.focus()}>
                <div className={styles.leftBox}>
                    {left.map((val, ind) => <span key={ind} className={styles.leftWord} style={leftStyles[ind]}>{val}</span>)}
                </div>
                <div className={styles.centerBox} contentEditable={true} onKeyDown={(event) => handleInput(event)} ref={inputRef}>
                </div>
                <div className={styles.rightBox}>
                    {right.map((val, ind) => <span key={ind} className={styles.word}>{val}</span>)}
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    reset();
                }}
                className={styles.modal}
            >
                <p>Words / minute: {goodWords} Accuracy: {accuracy}</p>
            </Modal>
        </div>
    );
}

export default TypingProject;