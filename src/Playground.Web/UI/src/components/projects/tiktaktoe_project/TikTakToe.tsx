import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';
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
    winningPiece: string
}

enum GameState {
    noWins = 0,
    xWins = 1,
    oWins = 2,
    tie = 3
}

const TikTakToe = (props: React.PropsWithChildren<ITikTakToeProps>) => {
    const { n } = props;
    const [board, setBoard] = useState(Array(n).fill(Array(n).fill('')));
    const [piece, setPiece] = useState('X');
    const [boardState, setBoardState] = useState<ITikTakToeBoardState>(emptyBoardState());
    const [gameState, setGameState] = useState('Game On!');

    function updateGameState(gameState: GameState) {
        if (gameState === GameState.xWins) {
            setGameState("X Wins!");
        }
        else if (gameState === GameState.oWins) {
            setGameState("O Wins!");
        }
        else if (gameState === GameState.tie) {
            setGameState("Tie!");
        }
        else {
            setGameState("Game On!");
        }
    }

    function emptyBoardState() {
        return {
            n: n,
            rowSum: Array(n).fill(0),
            colSum: Array(n).fill(0),
            mainDiagSum: 0,
            offDiagSum: 0,
            gameState: GameState.noWins,
            winningPiece: ''
        } as ITikTakToeBoardState;
    }

    function cloneBoardState() {
        return {
            n: boardState.n,
            rowSum: Object.assign([], boardState.rowSum),
            colSum: Object.assign([], boardState.colSum),
            mainDiagSum: boardState.mainDiagSum,
            offDiagSum: boardState.offDiagSum,
            gameState: boardState.gameState,
            winningPiece: boardState.winningPiece
        } as ITikTakToeBoardState;
    }

    function winPossible(tmpState: ITikTakToeBoardState, tmpBoard: any, piece: string): boolean {
        let remainingEmpty = 0;
        for (let i = 0; i < n; i++)
        {
            for (let j = 0; j < n; j++) {
                if (tmpBoard[i][j] === '') {
                    remainingEmpty++;
                }
            }
        }

        /* get numMovesLeft for player to figure out if it's possible to win */
        const numMovesLeft = Math.floor(remainingEmpty/ 2);
        const inc = piece === 'X' ? 1 : -1;

        /* find if a row win is possible */
        for (let i = 0; i < n; i++) {
            let totEmpty = 0;
            for (let j = 0; j < n; j++) {
                totEmpty += tmpBoard[i][j] === '' ? inc : 0;
            }
            if (totEmpty < numMovesLeft && Math.abs(tmpState.rowSum[i] + totEmpty) === n) {
                return true;
            }
        }

        /* find if a col win is possible */
        for (let i = 0; i < n; i++) {
            let totEmpty = 0;
            for (let j = 0; j < n; j++) {
                totEmpty += tmpBoard[j][i] === '' ? inc : 0;
            }
            if (totEmpty < numMovesLeft && Math.abs(tmpState.colSum[i] + totEmpty) === n) {
                return true;
            }
        }

        let totEmpty = 0;
        let i = 0;
        let j = 0;
        while (i < n && j < n) {
            totEmpty += tmpBoard[i][j] === '' ? inc : 0;
            i++;
            j++;
        }
        if (totEmpty < numMovesLeft && Math.abs(tmpState.mainDiagSum + totEmpty) === n) {
            return true;
        }
        totEmpty = 0;
        i = 0;
        j = n - 1;
        while (i < n && j >= 0) {
            totEmpty += tmpBoard[i][j] === '' ? inc : 0;
            i++;
            j--;
        }
        return totEmpty < numMovesLeft && Math.abs(tmpState.offDiagSum + totEmpty) === n;
    }

    function updateBoardState(i: number, j: number, piece: string, tmpBoard: any) {
        const tmp = cloneBoardState();
        tmp.rowSum[i] += piece === 'X' ? 1 : -1;
        tmp.colSum[j] += piece === 'X' ? 1 : -1;
        if (i === j) {
            tmp.mainDiagSum += piece === 'X' ? 1 : -1;
        }
        if (Math.abs(tmp.n - 1 - j) === i) {
            tmp.offDiagSum += piece === 'X' ? 1 : -1;
        }
        if (Math.abs(tmp.rowSum[i]) === tmp.n || Math.abs(tmp.colSum[j]) === tmp.n || Math.abs(tmp.mainDiagSum) === tmp.n || Math.abs(tmp.offDiagSum) === tmp.n) {
            tmp.gameState = piece === 'X' ? GameState.xWins : GameState.oWins;
            tmp.winningPiece = piece;
        }

        var tot = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                tot += tmpBoard[i][j] !== '' ? 1 : 0;
            }
        }
        if (tot === 0 || (tmp.gameState === GameState.noWins && !winPossible(tmp, tmpBoard, piece) && !winPossible(tmp, tmpBoard, piece === 'X' ? 'O' : 'X'))) {
            tmp.gameState = GameState.tie;
        }

        console.log(piece, winPossible(tmp, tmpBoard, piece));
        console.log(piece === 'X' ? 'O' : 'X', winPossible(tmp, tmpBoard, piece === 'X' ? 'O' : 'X'));
        setBoardState(tmp);
        updateGameState(tmp.gameState);
    }

    function handleClick(i: number, j: number) {
        if (board[i][j] !== '' || boardState.gameState !== GameState.noWins) {
            return;
        }

        const tmp: any = [];
        board.forEach(row => tmp.push(Object.assign([], row)));
        tmp[i][j] = piece;
        updateBoardState(i, j, piece, tmp);
        setBoard(tmp);
        setPiece(piece === 'X' ? 'O' : 'X');
    }

    const content = [];
    for (let i = 0; i < n; i++) {
        const tmp = [];
        for (let j = 0; j < n; j++) {
            tmp.push(<button className="box" key={i.toString() + "|" + j.toString()} onClick={() => handleClick(i, j)}>{board[i][j]}</button>);
        }
        content.push(tmp);
    }

    return (
        <div className="tiktaktoe">
            {content.map((buttons, i) => <div className="row" key={i}>{buttons.map(button => button)}</div>)}
            <p>{gameState}</p>
            <Button
                className="clearButton"
                variant="contained"
                color="secondary"
                startIcon={<ClearAllIcon />}
                onClick={() => { setPiece('X'); setBoard(Array(n).fill(Array(n).fill(''))); setBoardState(emptyBoardState()); updateGameState(GameState.noWins)}}
            >
                Clear
            </Button>
        </div>
    );
}

export default TikTakToe;