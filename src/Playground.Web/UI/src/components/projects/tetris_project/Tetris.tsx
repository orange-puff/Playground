import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ROWS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const COLS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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

function constructSBlock(): IPiece {
    return {
        color: "#17f239",
        position: { x: 0, y: 4 },
        space: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
            { x: 0, y: 2 }
        ],
        code: 1
    }
}

function constructZBlock(): IPiece {
    return {
        color: "#f21717",
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ],
        code: 2
    }
}

function constructLBlock(): IPiece {
    return {
        color: "#f07013",
        position: { x: 0, y: 4 },
        space: [
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 }
        ],
        code: 3
    }
}

function constructJBlock(): IPiece {
    return {
        color: "#2413f0",
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 }
        ],
        code: 4
    }
}

function constructOBlock(): IPiece {
    return {
        color: "#f2ef17",
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ],
        code: 5
    }
}

function constructIBlock(): IPiece {
    return {
        color: "1facd7",
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
        ],
        code: 6
    }
}

function constructTBlock(): IPiece {
    return {
        color: "#d717f2",
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 1 }
        ],
        code: 6
    }
}

interface IPoint {
    x: number,
    y: number
}

interface IPiece {
    color: string,
    position: IPoint,
    space: IPoint[],
    code: number
}

function clonePiece(piece: IPiece): IPiece {
    return {
        color: piece.color,
        position: { x: piece.position.x, y: piece.position.y },
        space: piece.space,
        code: piece.code
    };
}

enum PlayState {
    null,
    started
}

interface IGameState {
    board: number[][],
    currPiece: IPiece,
    placedPieces: IPiece[],
    playState: PlayState
}

function cloneGame(game: IGameState): IGameState {
    const board: number[][] = [];
    game.board.forEach(row => board.push(Object.assign([], row)));

    const currPiece: IPiece = clonePiece(game.currPiece);

    const placedPieces: IPiece[] = [];
    game.placedPieces.forEach(piece => placedPieces.push(clonePiece(piece)));

    const playState: PlayState = game.playState;

    return {
        board: board,
        currPiece: currPiece,
        placedPieces: placedPieces,
        playState: PlayState
    };
}

function initGame(): IGameState {
    const board: number[][] = [];
    ROWS.forEach(val => board.push(new Array(COLS.length)));

    return {
        board: board,
        currPiece: constructIBlock(),
        placedPieces: [],
        playState: PlayState.null
    }
}

function start(game: IGameState) {
    game = cloneGame(game);
    game.playState = PlayState.started;

    return game;
}

enum Move {
    up,
    down,
    left,
    right
}

function updateGame(game: IGameState) {
    game = cloneGame(game);

    return game;
}

const Tetris = () => {
    const styles = useStyles();
    const [game, setGame] = useState(initGame());

    return (
        <div>
            <button onClick={() => setGame(start(game))}>Start</button>
            <div>
                {
                    ROWS.map(i =>
                        <div className={styles.row} key={i}>
                            {COLS.map(j =>
                                <div className={styles.square} key={j}>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Tetris;