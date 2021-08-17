import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ROWS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const COLS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function indexGood(i: number, j: number) {
    return i >= 0 && i < ROWS.length && j >= 0 && j < COLS.length;
}

const codeToColor: { [key: number]: string } = {
    1: "#17f239",
    2: "#f21717",
    3: "#f07013",
    4: "#2413f0",
    5: "#f2ef17",
    6: "#1facd7",
    7: "#d717f2",
    8: "#d0cbcb"
};

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
        color: codeToColor[1],
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
        color: codeToColor[2],
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
        color: codeToColor[3],
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
        color: codeToColor[4],
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
        color: codeToColor[5],
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
        color: codeToColor[6],
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
        color: codeToColor[7],
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 1 }
        ],
        code: 7
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
    ROWS.forEach(val => board.push(new Array(COLS.length).fill(0)));
    return {
        board: board,
        currPiece: {
            code: 0,
            color: "",
            position: { x: 0, y: 0 },
            space: []
        },
        placedPieces: [],
        playState: PlayState.null
    }
}

function start(game: IGameState): IGameState {
    game = cloneGame(game);
    game.playState = PlayState.started;
    const currPiece = constructZBlock();
    currPiece.space.forEach(piece => game.board[currPiece.position.x + piece.x][currPiece.position.y + piece.y] = currPiece.code);
    game.currPiece = currPiece;
    return game;
}

enum Move {
    up,
    down,
    left,
    right,
    space
}

const moveMap: { [key in Move]: IPoint } = {
    [Move.down]: { x: 1, y: 0 },
    [Move.left]: { x: 0, y: -1 },
    [Move.right]: { x: 0, y: 1 }
};

function findDownFacingSpace(piece: IPiece): IPoint[] {
    var down: IPoint = moveMap[Move.down];
    var toRet: IPoint[] = [];

    for (let i = 0; i < piece.space.length; i++) {
        const downPiece: IPoint = { x: piece.space[i].x + down.x, y: piece.space[i].y + down.y };
        let good: boolean = false;
        piece.space.forEach(piece => {
            if (piece.x === downPiece.x && piece.y === downPiece.y) {
                good = false;
            }
        });
        if (good) {
            toRet.push(piece.space[i]);
        }
    }

    return toRet;
}

function updateGame(game: IGameState, move: Move): IGameState {
    game = cloneGame(game);
    if (move === Move.up) {

    }
    else if (move === Move.space) {

    }
    else {
        const movePoint: IPoint = moveMap[move];
        const newPosition: IPoint = { x: game.currPiece.position.x + movePoint.x, y: game.currPiece.position.y + movePoint.y };
        let good: boolean = true;
        game.currPiece.space.forEach(piece => {
            const i: number = piece.x + newPosition.x;
            const j: number = piece.y + newPosition.y;
            if (!indexGood(i, j) || (game.board[i][j] != game.currPiece.code && game.board[i][j] != 0)) {
                good = false;
            }
        });
        if (good) {
            game.currPiece.space.forEach(piece => game.board[game.currPiece.position.x + piece.x][game.currPiece.position.y + piece.y] = 0);
            game.currPiece.position = newPosition;
            game.currPiece.space.forEach(piece => game.board[game.currPiece.position.x + piece.x][game.currPiece.position.y + piece.y] = game.currPiece.code);
        }
    }

    return game;
}

const Tetris = () => {
    const styles = useStyles();
    const [game, setGame] = useState(initGame());
    const inputRef = useRef(null);

    function onKeyDown(event: any) {
        if (event.key === "ArrowLeft") {
            setGame(updateGame(game, Move.left));
        }
        else if (event.key === "ArrowRight") {
            setGame(updateGame(game, Move.right));
        }
        else if (event.key === "ArrowUp") {
            setGame(updateGame(game, Move.up));
        }
        else if (event.key === "ArrowDown") {
            setGame(updateGame(game, Move.down));
        }
    }

    return (
        <div>
            <button onClick={() => { setGame(start(game)); inputRef.current.focus(); }}>Start</button>
            <div onKeyDown={onKeyDown} ref={inputRef} tabIndex="0">
                {
                    ROWS.map(i =>
                        <div className={styles.row} key={i}>
                            {COLS.map(j =>
                                <div className={styles.square} key={j} style={game.board[i][j] in codeToColor ? { backgroundColor: codeToColor[game.board[i][j]] } : {}}>
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

/*
 * TODO
 * Need to figure out rotating. This will change the space of the piece
 */