import Button from '@material-ui/core/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import React, { useState } from 'react';
import './TikTakToe.css';

interface ITikTakToeProps {
    n: number
}

interface ITikTakToeBoardState {
    n: number,
    rowSum: number[],
    colSum: number[],
    mainDiagSum: number,
    offDiagSum: number,
    gameState: GameState,
    piece: string,
    board: string[][]
}

enum GameState {
    on = 0,
    xWins = 1,
    oWins = 2,
    tie = 3
}

function numMovesLeft(board: string[][], n: number, offset: number) {
    let remainingEmpty = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === '') {
                remainingEmpty++;
            }
        }
    }

    return Math.floor(remainingEmpty / 2) + offset;
}

function winPossible(state: ITikTakToeBoardState, inc: number, movesLeft: number): boolean {
    console.log(movesLeft);
    /* find if a row win is possible */
    for (let i = 0; i < state.n; i++) {
        let totEmpty = 0;
        for (let j = 0; j < state.n; j++) {
            totEmpty += state.board[i][j] === '' ? inc : 0;
        }
        console.log(`Row ${i} Empty in Row: ${totEmpty} Row Sum: ${state.rowSum[i]}`);
        if (Math.abs(totEmpty) <= movesLeft && Math.abs(state.rowSum[i] + totEmpty) === state.n) {
            return true;
        }
    }

    /* find if a col win is possible */
    for (let i = 0; i < state.n; i++) {
        let totEmpty = 0;
        for (let j = 0; j < state.n; j++) {
            totEmpty += state.board[j][i] === '' ? inc : 0;
        }
        console.log(`Col ${i} Empty in Col: ${totEmpty} Col Sum: ${state.colSum[i]}`);
        if (Math.abs(totEmpty) <= movesLeft && Math.abs(state.colSum[i] + totEmpty) === state.n) {
            return true;
        }
    }

    let totEmpty = 0;
    let i = 0;
    let j = 0;
    while (i < state.n && j < state.n) {
        totEmpty += state.board[i][j] === '' ? inc : 0;
        i++;
        j++;
    }
    console.log(`Empty in Main Diag: ${totEmpty} Main Diag Sum: ${state.mainDiagSum}`);
    if (Math.abs(totEmpty) <= movesLeft && Math.abs(state.mainDiagSum + totEmpty) === state.n) {
        return true;
    }

    totEmpty = 0;
    i = 0;
    j = state.n - 1;
    while (i < state.n && j >= 0) {
        totEmpty += state.board[i][j] === '' ? inc : 0;
        i++;
        j--;
    }
    console.log(`Empty in Off Diag: ${totEmpty} Off Diag Sum: ${state.offDiagSum}`);
    return Math.abs(totEmpty) <= movesLeft && Math.abs(state.offDiagSum + totEmpty) === state.n;
}

function emptyBoardState(n: number) {
    return {
        n: n,
        rowSum: Array(n).fill(0),
        colSum: Array(n).fill(0),
        mainDiagSum: 0,
        offDiagSum: 0,
        gameState: GameState.on,
        piece: 'X',
        board: Array(n).fill(Array(n).fill(''))
    } as ITikTakToeBoardState;
}

function cloneBoardState(boardState: ITikTakToeBoardState) {
    const tmp: any = [];
    boardState.board.forEach(row => tmp.push(Object.assign([], row)));
    return {
        n: boardState.n,
        rowSum: Object.assign([], boardState.rowSum),
        colSum: Object.assign([], boardState.colSum),
        mainDiagSum: boardState.mainDiagSum,
        offDiagSum: boardState.offDiagSum,
        gameState: boardState.gameState,
        piece: boardState.piece,
        board: tmp
    } as ITikTakToeBoardState;
}

const TikTakToe = (props: React.PropsWithChildren<ITikTakToeProps>) => {
    const { n } = props;
    const [boardState, setBoardState] = useState<ITikTakToeBoardState>(emptyBoardState(n));

    function updateBoardState(i: number, j: number) {
        const tmpBoard: any = [];
        boardState.board.forEach(row => tmpBoard.push(Object.assign([], row)));
        tmpBoard[i][j] = boardState.piece;

        const tmpState = cloneBoardState(boardState);
        tmpState.board = tmpBoard;
        const inc = boardState.piece === 'X' ? 1 : -1;
        tmpState.rowSum[i] += inc;
        tmpState.colSum[j] += inc;
        if (i === j) {
            tmpState.mainDiagSum += inc;
        }
        if (Math.abs(tmpState.n - 1 - j) === i) {
            tmpState.offDiagSum += inc;
        }
        if (Math.abs(tmpState.rowSum[i]) === tmpState.n || Math.abs(tmpState.colSum[j]) === tmpState.n || Math.abs(tmpState.mainDiagSum) === tmpState.n || Math.abs(tmpState.offDiagSum) === tmpState.n) {
            tmpState.gameState = tmpState.piece === 'X' ? GameState.xWins : GameState.oWins;
        }

        var tot = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                tot += tmpBoard[i][j] !== '' ? 1 : 0;
            }
        }
        
        if (tot === 0 || (tmpState.gameState === GameState.on && !winPossible(tmpState, tmpState.piece === 'X' ? 1 : -1, numMovesLeft(tmpBoard, n, 0)) && !winPossible(tmpState, tmpState.piece === 'X' ? -1 : 1, numMovesLeft(tmpBoard, n, 1)))) {
            tmpState.gameState = GameState.tie;
        }

        console.log(`${tmpState.piece} can win`);
        console.log(`${winPossible(tmpState, tmpState.piece === 'X' ? 1 : -1, numMovesLeft(tmpBoard, n, 0))}`);
        console.log(`${tmpState.piece === 'X' ? 'O' : 'X'} can win`);
        console.log(`${winPossible(tmpState, tmpState.piece === 'X' ? -1 : 1, numMovesLeft(tmpBoard, n, 1))}`);
        tmpState.piece = tmpState.piece === 'X' ? 'O' : 'X';
        setBoardState(tmpState);
    }

    function handleClick(i: number, j: number) {
        if (boardState.board[i][j] !== '' || boardState.gameState !== GameState.on) {
            return;
        }

        updateBoardState(i, j);
    }

    const content = [];
    for (let i = 0; i < n; i++) {
        const tmp = [];
        for (let j = 0; j < n; j++) {
            tmp.push(<button className="box" key={i.toString() + "|" + j.toString()} onClick={() => handleClick(i, j)}>{boardState.board[i][j]}</button>);
        }
        content.push(tmp);
    }

    return (
        <div className="tiktaktoe">
            {content.map((buttons, i) => <div className="row" key={i}>{buttons.map(button => button)}</div>)}
            <p>{boardState.gameState === GameState.on ? "Game On!" : (boardState.gameState === GameState.tie ? "Tie!" : (boardState.gameState === GameState.xWins ? "X Wins!" : "O Wins"))}</p>
            <Button
                className="clearButton"
                variant="contained"
                color="secondary"
                startIcon={<ClearAllIcon />}
                onClick={() =>
                {
                    setBoardState(emptyBoardState(n));
                }}
            >
                Clear
            </Button>
        </div>
    );
}

export default TikTakToe;