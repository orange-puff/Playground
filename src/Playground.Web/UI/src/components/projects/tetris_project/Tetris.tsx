import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const NUM_ROWS = 20;
const NUM_COLS = 10;

const useStyles = makeStyles((theme) => ({
    square: {
        height: "20px",
        width: "20px",
        border: "1px solid #999",
        float: "left"
    },
    row: {
        display: "table"
    }
}));

function constructOrangeRicky(): IPiece {
    const tmp = IPiece {

    }
    return {
        color: "orange",
        position: { x: 0, y: 4 },
        space: []{
        { x: 0, y: 0 },
    }
}
}

interface IPoint {
    x: number,
    y: number
}

interface IPiece {
    color: string,
    position: IPoint,
    space: IPoint[]
}

interface IGameState {
    board: Array<Array<number>>
}

const Tetris = () => {
    const styles = useStyles();

    const rows: Array<number> = [];
    const cols: Array<number> = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        rows.push(i);
    }
    for (let i = 0; i < NUM_COLS; i++) {
        cols.push(i);
    }

    return (
        <div>
            {
                rows.map(i =>
                    <div className={styles.row} key={i}>
                        {cols.map(j =>
                            <div className={styles.square} key={j}>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default Tetris;

/*
 * We have pieces with specified sizes and codes
 * We have an array of array of numbers that represents the board. 0 is empty, and some non zero number is the code of a piece
 *
 *
*/