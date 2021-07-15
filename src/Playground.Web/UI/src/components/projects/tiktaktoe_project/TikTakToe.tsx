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
    gameOver: boolean,
    winningPiece: string
}

const TikTakToe = (props: React.PropsWithChildren<ITikTakToeProps>) => {
    const { n } = props;
    const [board, setBoard] = useState(Array(n).fill(Array(n).fill('')));
    const [piece, setPiece] = useState('X');
    const [boardState, setBoardState] = useState<ITikTakToeBoardState>(emptyBoardState());

    function emptyBoardState() {
        return {
            n: n,
            rowSum: Array(n).fill(0),
            colSum: Array(n).fill(0),
            mainDiagSum: 0,
            offDiagSum: 0,
            gameOver: false,
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
            gameOver: boardState.gameOver,
            winningPiece: boardState.winningPiece
        } as ITikTakToeBoardState;
    }

    function updateBoardState(i: number, j: number, piece: string) {
        const tmp = cloneBoardState();
        tmp.rowSum[i] += piece == 'X' ? 1 : -1;
        tmp.colSum[j] += piece == 'X' ? 1 : -1;
        if (i === j) {
            tmp.mainDiagSum += piece == 'X' ? 1 : -1;
        }
        if (Math.abs(tmp.n - 1 - j) == i) {
            tmp.offDiagSum += piece == 'X' ? 1 : -1;
        }
        if (Math.abs(tmp.rowSum[i]) === tmp.n || Math.abs(tmp.colSum[j]) === tmp.n || Math.abs(tmp.mainDiagSum) === tmp.n || Math.abs(tmp.offDiagSum) === tmp.n) {
            tmp.gameOver = true;
            tmp.winningPiece = piece;
        }

        setBoardState(tmp);
    }

    function handleClick(i: number, j: number) {
        if (board[i][j] != '' || boardState.gameOver) {
            return;
        }

        const tmp: any = [];
        board.forEach(row => tmp.push(Object.assign([], row)));
        tmp[i][j] = piece;
        updateBoardState(i, j, piece);
        setPiece(piece === 'X' ? 'O' : 'X');
        setBoard(tmp);
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
        <div>
            {content.map((buttons, i) => <div className="row" key={i}>{buttons.map(button => button)}</div>)}
            <Button
                variant="contained"
                color="secondary"
                startIcon={<ClearAllIcon />}
                onClick={() => { setPiece('X'); setBoard(Array(n).fill(Array(n).fill(''))); setBoardState(emptyBoardState()) }}
            >
                Clear
                </Button>
            {boardState.gameOver
                ? <p>Game Over! {boardState.winningPiece} Wins!</p>
                : <p> Game On!</p>
            }
        </div>
    );
}

export default TikTakToe;