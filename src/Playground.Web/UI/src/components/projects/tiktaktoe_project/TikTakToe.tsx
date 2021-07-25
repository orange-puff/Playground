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
    board: string[][],
    singlePlayer: boolean
}

interface IMove {
    i: number,
    j: number
}

interface IScoreMove extends IMove {
    score: number,
    depth: number
}

enum GameState {
    on = 0,
    xWins = 1,
    oWins = 2,
    tie = 3,
    none = 4
}

function AvailableMoves(board: string[][], n: number): IMove[] {
    const toRet: IMove[] = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === '') {
                toRet.push({ i: i, j: j } as IMove);
            }
        }
    }
    return toRet;
}

function AIMoveCore(boardState: ITikTakToeBoardState, move: IMove, maxi: boolean, depth: number): IScoreMove {
    const newBoardState = makeMove(boardState, move);

    if (newBoardState.gameState === GameState.xWins || newBoardState.gameState === GameState.oWins) {
        return { i: move.i, j: move.j, score: 1, depth: depth };
    }
    else if (newBoardState.gameState === GameState.tie) {
        return { i: move.i, j: move.j, score: 0, depth: depth };
    }

    let bestMove: IScoreMove = { i: -1, j: -1, score: 0, depth: depth };
    let bestScore = -1;
    let bestDepth = boardState.n * boardState.n;

    const availableMoves: IMove[] = AvailableMoves(newBoardState.board, newBoardState.n);
    availableMoves.forEach(availableMove => {
        const tmpMove = AIMoveCore(newBoardState, availableMove, !maxi, depth + 1);
        if (tmpMove.score > bestScore || bestMove.i === -1 || (tmpMove.score === bestScore && tmpMove.depth < bestDepth)) {
            bestScore = tmpMove.score;
            bestMove = { i: tmpMove.i, j: tmpMove.j, score: tmpMove.score, depth: tmpMove.depth } as IScoreMove;
            bestDepth = tmpMove.depth;
        }
    });

    unmakeMove(newBoardState, move);
    return bestMove;
}

function AIMove(boardState: ITikTakToeBoardState): IMove {
    const tmpState = cloneBoardState(boardState);
    let bestMove: IMove = { i: -1, j: -1 };
    let bestScore = -1;
    let bestDepth = boardState.n * boardState.n;

    const availableMoves: IMove[] = AvailableMoves(tmpState.board, tmpState.n);
    availableMoves.forEach(move => {
        const tmpMove = AIMoveCore(tmpState, move, true, 1);
        if (tmpMove.score > bestScore || bestMove.i === -1 || (tmpMove.score === bestScore && tmpMove.depth < bestDepth)) {
            bestScore = tmpMove.score;
            bestMove = { i: tmpMove.i, j: tmpMove.j } as IMove;
            bestDepth = tmpMove.depth;
        }
    });

    return bestMove;
}

function unmakeMove(boardState: ITikTakToeBoardState, move: IMove): ITikTakToeBoardState {
    boardState.board[move.i][move.j] = '';

    const inc = boardState.piece === 'X' ? 1 : -1;
    boardState.rowSum[move.i] -= inc;
    boardState.colSum[move.j] -= inc;
    if (move.i === move.j) {
        boardState.mainDiagSum -= inc;
    }
    if (Math.abs(boardState.n - 1 - move.j) === move.i) {
        boardState.offDiagSum -= inc;
    }

    boardState.piece = boardState.piece === 'X' ? 'O' : 'X';
    boardState.gameState = GameState.on;
    return boardState;
}

function makeMove(boardState: ITikTakToeBoardState, move: IMove): ITikTakToeBoardState {
    const tmpState = cloneBoardState(boardState);
    tmpState.board[move.i][move.j] = boardState.piece;

    const inc = boardState.piece === 'X' ? 1 : -1;
    tmpState.rowSum[move.i] += inc;
    tmpState.colSum[move.j] += inc;
    if (move.i === move.j) {
        tmpState.mainDiagSum += inc;
    }
    if (Math.abs(tmpState.n - 1 - move.j) === move.i) {
        tmpState.offDiagSum += inc;
    }
    if (Math.abs(tmpState.rowSum[move.i]) === tmpState.n || Math.abs(tmpState.colSum[move.j]) === tmpState.n || Math.abs(tmpState.mainDiagSum) === tmpState.n || Math.abs(tmpState.offDiagSum) === tmpState.n) {
        tmpState.gameState = tmpState.piece === 'X' ? GameState.xWins : GameState.oWins;
    }

    var tot = 0;
    for (let i = 0; i < tmpState.n; i++) {
        for (let j = 0; j < tmpState.n; j++) {
            tot += tmpState.board[i][j] !== '' ? 1 : 0;
        }
    }

    if (tot === 0 || (tmpState.gameState === GameState.on && !winPossible(tmpState, tmpState.piece === 'X' ? 1 : -1, numMovesLeft(tmpState.board, tmpState.n, 0)) && !winPossible(tmpState, tmpState.piece === 'X' ? -1 : 1, numMovesLeft(tmpState.board, tmpState.n, 1)))) {
        tmpState.gameState = GameState.tie;
    }

    tmpState.piece = tmpState.piece === 'X' ? 'O' : 'X';
    return tmpState;
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
    /* find if a row win is possible */
    for (let i = 0; i < state.n; i++) {
        let totEmpty = 0;
        for (let j = 0; j < state.n; j++) {
            totEmpty += state.board[i][j] === '' ? inc : 0;
        }
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
    return Math.abs(totEmpty) <= movesLeft && Math.abs(state.offDiagSum + totEmpty) === state.n;
}

function emptyBoardState(n: number) {
    return {
        n: n,
        rowSum: Array(n).fill(0),
        colSum: Array(n).fill(0),
        mainDiagSum: 0,
        offDiagSum: 0,
        gameState: GameState.none,
        piece: 'X',
        board: Array(n).fill(Array(n).fill('')),
        singlePlayer: true
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
        board: tmp,
        singlePlayer: boardState.singlePlayer
    } as ITikTakToeBoardState;
}

const TikTakToe = (props: React.PropsWithChildren<ITikTakToeProps>) => {
    const { n } = props;
    const [boardState, setBoardState] = useState<ITikTakToeBoardState>(emptyBoardState(n));

    function AIMakeMove(state: ITikTakToeBoardState) {
        const move = AIMove(state);
        const tmpState = makeMove(state, move);
        setBoardState(tmpState);
    }

    function updateBoardState(i: number, j: number) {
        const tmpState = makeMove(boardState, { i: i, j: j } as IMove);
        setBoardState(tmpState);
        if (boardState.singlePlayer && tmpState.gameState === GameState.on) {
            AIMakeMove(cloneBoardState(tmpState));
        }
    }

    function handleClick(i: number, j: number) {
        /* If this is invalid square or we are not in the game yet */
        if (boardState.board[i][j] !== '' || boardState.gameState !== GameState.on) {
            return;
        }
        /* if this is single player and it is AIs turn */
        if (boardState.singlePlayer && boardState.piece === 'X') {
            return;
        }
        updateBoardState(i, j);
    }

    function handleStartClick() {
        if (boardState.gameState !== GameState.none) {
            return;
        }

        let tmp = cloneBoardState(boardState);
        tmp.gameState = GameState.on;
        if (tmp.singlePlayer) {
            const randomi = Math.floor(Math.random() * tmp.n);
            const randomj = Math.floor(Math.random() * tmp.n);
            tmp = makeMove(tmp, { i: randomi, j: randomj });
        }
        setBoardState(tmp);
    }

    function handleRadioClick(singlePlayer: boolean) {
        if (boardState.gameState !== GameState.none) {
            return;
        }
        const tmp = cloneBoardState(boardState);
        tmp.singlePlayer = singlePlayer;
        setBoardState(tmp);
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
            <div className="body">
                <p>
                    The AI behind this algorithm is simple. Traverse every possible move and find the ones that end
                    in the highest score possible for the AI.
                    A score of 1 is received by the AI if the game ends in a win, a score of 0 if the game ends
                    in a tie, and a score of -1 if the game ends in a loss.
                </p>
            </div>
            <span>
                <button onClick={handleStartClick}>Start</button>
                <input type="radio" id="singlePlayer" checked={boardState.singlePlayer} onChange={() => handleRadioClick(true)} className="radioButton" />
                <label htmlFor="singlePlayer">single player</label>
                <input type="radio" id="multiPlayer" checked={!boardState.singlePlayer} onChange={() => handleRadioClick(false)} className="radioButton" />
                <label htmlFor="multiPlayer">multi player</label>
            </span>
            <p>
                {boardState.gameState === GameState.on
                    ? "Game On!"
                    : (boardState.gameState === GameState.tie
                        ? "Tie!"
                        : (boardState.gameState === GameState.xWins
                            ? "X Wins!"
                            : (boardState.gameState === GameState.oWins
                                ? "O Wins!"
                                : "Click start for a game.")))}
            </p>
            {content.map((buttons, i) => <div className="row" key={i}>{buttons.map(button => button)}</div>)}
            <p></p>
            <button onClick={() => setBoardState(emptyBoardState(n))}>
                Restart
            </button>
        </div>
    );
}

export default TikTakToe;