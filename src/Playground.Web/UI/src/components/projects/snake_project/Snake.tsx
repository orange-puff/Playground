import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

enum Direction {
    up,
    down,
    left,
    right
}

const ROWS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const COLS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const M: number = ROWS.length;
const N: number = COLS.length;
const HEAD: number = 1;
const EMPTY: number = 0;
const FOOD: number = -1;
const BODY: number = 2;
const COLORS: { [key: number]: string } = {
    [EMPTY]: "grey",
    [HEAD]: "#f21717",
    [FOOD]: "#17f239",
};
const DIRECTIONS: { [key in Direction]: number[] } = {
    [Direction.up]: [-1, 0],
    [Direction.left]: [0, -1],
    [Direction.right]: [0, 1],
    [Direction.down]: [1, 0],
};

const useStyles = makeStyles((theme) => ({
    body: {
        marginTop: "50px",
        marginLeft: "200px"
    },
    row: {
        display: "table"
    },
    square: {
        height: "25px",
        width: "25px",
        border: "1px solid #999",
        float: "left"
    },
}));

function initBoard(): number[][] {
    const toRet: number[][] = [];
    ROWS.forEach(_ => toRet.push(new Array(COLS.length).fill(0)));
    toRet[M / 2][N / 2] = HEAD;
    const ind: number[] = randomIndex(findIgnorePoints(toRet));
    toRet[ind[0]][ind[1]] = FOOD;
    return toRet;
}

function randomIndex(ignore: number[][]): number[] {
    const toRet: number[] = [-1, -1];
    while (true) {
        const i = Math.floor((Math.random() * ROWS.length));
        const j = Math.floor((Math.random() * COLS.length));

        toRet[0] = i;
        toRet[1] = j;
        let shouldIgnore = false;
        ignore.forEach(point => shouldIgnore = shouldIgnore || (point[0] == i && point[1] == j));
        if (!shouldIgnore) {
            break;
        }
    }

    return toRet;
}

function findIgnorePoints(board: number[][]): number[][] {
    const toRet: number[][] = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== EMPTY) {
                toRet.push([i, j]);
            }
        }
    }
    return toRet;
}

function outOfBounds(i: number, j: number): boolean {
    return i < 0 || i >= ROWS.length || j <= 0 || j >= COLS.length;
}

function getBody(board: number[][]): { [key: number]: number[] } {
    const body: { [key: number]: number[] } = {};
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] >= HEAD) {
                body[board[i][j]] = [i, j];
            }
        }
    }

    return body;
}

function tick(board: number[][], dir: Direction): number[][] {
    const newBoard: number[][] = [];
    board.forEach(row => newBoard.push(Object.assign([], row)));

    let body: { [key: number]: number[] } = getBody(board);
    const maxBody: number = Object.keys(body).length;

    const direction = DIRECTIONS[dir];
    let ateBug: boolean = false;
    for (let i = HEAD; i <= maxBody; i++) {
        const currInd: number[] = body[i];
        const newInd: number[] = [currInd[0] + direction[0], currInd[1] + direction[1]];
        // if we go out of bounds
        if (outOfBounds(newInd[0], newInd[1])) {
            return null;
        }
        // if we overlap, game over
        if (newBoard[newInd[0]][newInd[1]] >= HEAD) {
            return null;
        }
        // ate bug
        if (i == HEAD && newBoard[newInd[0]][newInd[1]] === FOOD) {
            ateBug = true;
        }
        newBoard[newInd[0]][newInd[1]] = newBoard[currInd[0]][currInd[1]];
        newBoard[currInd[0]][currInd[1]] = EMPTY;
    }

    if (ateBug) {
        const tailInd: number[] = [body[maxBody][0] + direction[0], body[maxBody][1] + direction[1]];
        const row: number[] = [-1, 1, 0, 0];
        const col: number[] = [0, 0, -1, 1];

        let addedTail = false;
        for (let i = 0; i < row.length; i++) {
            const newInd: number[] = [tailInd[0] + row[i], tailInd[1] + col[i]];
            if (outOfBounds(newInd[0], newInd[1])) {
                continue;
            }
            if (newBoard[newInd[0]][newInd[1]] === EMPTY) {
                addedTail = true;
                newBoard[newInd[0]][newInd[1]] = maxBody + 1;
                break;
            }
        }

        if (!addedTail) {
            return null;
        }

        const randInd: number[] = randomIndex(findIgnorePoints(newBoard));
        newBoard[randInd[0]][randInd[1]] = FOOD;
    }

    return newBoard;
}

const Snake = () => {
    const styles = useStyles();
    const [board, setBoard] = useState<number[][]>(null);
    const [dir, setDir] = useState<Direction>(Direction.right);
    const [useless, setUseless] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null);
    const inputRef = useRef(null);

    function startGame() {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        setBoard(initBoard());
        setDir(Direction.right);
        const intId = setInterval(() => {
            setUseless((oldUseless) => {
                return oldUseless + 1;
            })
        }, 100);
        setIntervalId(intId);
    }

    useEffect(() => {
        if (board != null) {
            const newBoard: number[][] = tick(board, dir);
            if (newBoard == null) {
                setGameOver(true);
                startGame();
            }
            else {
                setBoard(tick(board, dir));
            }
        }
    }, [useless]);

    function onKeyDown(event: any) {
        if (event.key === "ArrowLeft") {
            setDir(Direction.left);
        }
        else if (event.key === "ArrowRight") {
            setDir(Direction.right);
        }
        else if (event.key === "ArrowUp") {
            setDir(Direction.up);
        }
        else if (event.key === "ArrowDown") {
            setDir(Direction.down);
        }
    }

    return (
        <div className={styles.body}>
            <button onClick={() => { startGame(); inputRef.current.focus(); }}>Start</button>
            <div onKeyDown={onKeyDown} ref={inputRef} tabIndex={0}>
                {
                    ROWS.map(i =>
                        <div className={styles.row} key={i}>
                            {COLS.map(j =>
                                <div className={styles.square} key={j} style={board != null ? board[i][j] >= BODY ? { backgroundColor: "#1facd7" } : { backgroundColor: COLORS[board[i][j]] } : {}}>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Snake;