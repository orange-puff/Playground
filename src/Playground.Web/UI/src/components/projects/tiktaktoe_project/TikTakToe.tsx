import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import './TikTakToe.css';

interface ITikTakToeProps {
    n: number
}

const TikTakToe = (props: React.PropsWithChildren<ITikTakToeProps>) => {
    const { n } = props;
    const [board, setBoard] = useState(Array(n).fill(Array(n).fill('')));
    const [piece, setPiece] = useState('X');

    function handleClick(i: number, j: number) {
        if (board[i][j] != '') {
            return;
        }

        const tmp: any = [];
        board.forEach(row => tmp.push(Object.assign([], row)));
        tmp[i][j] = piece;
        setPiece(piece == 'X' ? 'O' : 'X');
        setBoard(tmp);
    }

    const content = [];
    for (let i = 0; i < n; i++) {
        const tmp = [];
        for (let j = 0; j < n; j++) {
            tmp.push(<button className="box" onClick={() => handleClick(i, j)}>{board[i][j]}</button>);
        }
        content.push(tmp);
    }

    return (
        <div>
            {content.map(buttons => <div className="row">{buttons.map(button => button)}</div>)}
            <Button
                className="clearButton"
                variant="contained"
                color="secondary"
                startIcon={<ClearAllIcon />}
                onClick={() => { setPiece('X'); setBoard(Array(n).fill(Array(n).fill(''))); }}
            >
                Clear
                </Button>
        </div>
    );
}

export default TikTakToe;