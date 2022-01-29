import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { off } from 'process';
import { PictureInPictureSharp } from '@material-ui/icons';

const ROWS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const COLS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function indexGood(i: number, j: number) {
    return i >= 0 && i < ROWS.length && j >= 0 && j < COLS.length;
}

const S_BLOCK_CODE = 1;
const Z_BLOCK_CODE = 2;
const L_BLOCK_CODE = 3;
const J_BLOCK_CODE = 4;
const O_BLOCK_CODE = 5;
const I_BLOCK_CODE = 6;
const T_BLOCK_CODE = 7;
const LOW_BLOCK_CODE = 8;

const codeToSpace: { [key: number]: IPoint[][] } = {
    [S_BLOCK_CODE]: [
        [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
            { x: 0, y: 2 }
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ]
    ],
    [Z_BLOCK_CODE]: [
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ],
        [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 0 }
        ]
    ],
    [L_BLOCK_CODE]: [
        [
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 }
        ],
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 0, y: 2 }
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 1 }
        ]
    ],
    [J_BLOCK_CODE]: [
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 }
        ],
        [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 2, y: 0 }
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 }
        ]
    ],
    [O_BLOCK_CODE]: [
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ]
    ],
    [I_BLOCK_CODE]: [
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 }
        ]
    ]
};

const codeToColor: { [key: number]: string } = {
    [S_BLOCK_CODE]: "#17f239",
    [Z_BLOCK_CODE]: "#f21717",
    [L_BLOCK_CODE]: "#f07013",
    [J_BLOCK_CODE]: "#2413f0",
    [O_BLOCK_CODE]: "#f2ef17",
    [I_BLOCK_CODE]: "#1facd7",
    [T_BLOCK_CODE]: "#d717f2",
    [LOW_BLOCK_CODE]: "#d0cbcb"
};

function generateRandomBlock(): IPiece {
    const pieceNum: number = Math.floor((Math.random() * 7) + 1);
    switch (pieceNum) {
        case S_BLOCK_CODE:
            return constructSBlock();
        case Z_BLOCK_CODE:
            return constructZBlock();
        case L_BLOCK_CODE:
            return constructLBlock();
        case J_BLOCK_CODE:
            return constructJBlock();
        case O_BLOCK_CODE:
            return constructOBlock();
        case I_BLOCK_CODE:
            return constructIBlock();
        case T_BLOCK_CODE:
            return constructTBlock();
    }
}

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
        spaceInd: 0,
        color: codeToColor[S_BLOCK_CODE],
        position: { x: 0, y: 4 },
        space: codeToSpace[S_BLOCK_CODE][0],
        code: S_BLOCK_CODE
    }
}

function constructZBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[Z_BLOCK_CODE],
        position: { x: 0, y: 4 },
        space: codeToSpace[Z_BLOCK_CODE][0],
        code: Z_BLOCK_CODE
    }
}

function constructLBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[L_BLOCK_CODE],
        position: { x: 0, y: 4 },
        space: codeToSpace[L_BLOCK_CODE][0],
        code: L_BLOCK_CODE
    }
}

function constructJBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[J_BLOCK_CODE],
        position: { x: 0, y: 4 },
        space: codeToSpace[J_BLOCK_CODE][0],
        code: J_BLOCK_CODE
    }
}

function constructOBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[O_BLOCK_CODE],
        position: { x: 0, y: 4 },
        space: codeToSpace[O_BLOCK_CODE][0],
        code: O_BLOCK_CODE
    }
}

function constructIBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[I_BLOCK_CODE],
        position: { x: 0, y: 4 },
        space: codeToSpace[I_BLOCK_CODE][0],
        code: I_BLOCK_CODE
    }
}

function constructTBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[T_BLOCK_CODE][0],
        position: { x: 0, y: 4 },
        space: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 1 }
        ],
        code: T_BLOCK_CODE
    }
}

interface IPoint {
    x: number,
    y: number
}

interface IPiece {
    spaceInd: number,
    color: string,
    position: IPoint,
    space: IPoint[],
    code: number
}

function clonePiece(piece: IPiece): IPiece {
    return {
        spaceInd: piece.spaceInd,
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
    currPiece: IPiece
}

function cloneGame(game: IGameState): IGameState {
    const board: number[][] = [];
    game.board.forEach(row => board.push(Object.assign([], row)));

    const currPiece: IPiece = clonePiece(game.currPiece);

    return {
        board: board,
        currPiece: currPiece
    };
}

// remove current piece
// try place new piece, if works, place shadow, return true/false
// if I cannot place new piece, add my piece back
// try remove row(s)

// place piece should be, place reale piece, place low piece
function tryPlacePiece(board: number[][], piece: IPiece) {
    let canPlace: boolean = true;
    piece.space.forEach(offset => {
        if (board[piece.position.x + offset.x][piece.position.y + offset.y] != 0 && board[piece.position.x + offset.x][piece.position.y + offset.y] != LOW_BLOCK_CODE) {
            canPlace = false;
        }
    });

    if (canPlace) {
        piece.space.forEach(offset => board[piece.position.x + offset.x][piece.position.y + offset.y] = piece.code);
        placeDownPiece(board, piece);
    }

    return canPlace;
}

function findDownPieces(board: number[][], piece: IPiece) {
    const low: IPiece = clonePiece(piece);
    
    let lowPoints: IPoint[] = [];
    let downx: number = low.position.x;
    while (true) {
        downx = downx + 1;
        const downPoints: IPoint[] = [];
        piece.space.forEach(offSet => {
            downPoints.push({x: downx + offSet.x, y: piece.position.y + offSet.y});
        });

        let canPlace = true;
        downPoints.forEach(point => {
            canPlace = canPlace && indexGood(point.x, point.y) && (board[point.x][point.y] === 0 || board[point.x][point.y] === piece.code || board[point.x][point.y] === LOW_BLOCK_CODE);
        });

        if (canPlace) {
            lowPoints = downPoints;
        }
        else {
            break;
        }
    }

    return lowPoints;
}

function placeDownPiece(board: number[][], piece: IPiece) {
    const lowPoints = findDownPieces(board, piece);
    lowPoints.forEach(point => board[point.x][point.y] = LOW_BLOCK_CODE);
}

function initGame(): IGameState {
    const board: number[][] = [];
    ROWS.forEach(val => board.push(new Array(COLS.length).fill(0)));
    const piece: IPiece = generateRandomBlock();
    tryPlacePiece(board, piece);

    return {
        board: board,
        currPiece: piece
    }
}

function start(): IGameState {
    return initGame();
    // start interval
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
    [Move.right]: { x: 0, y: 1 },
    [Move.up]: {x: 0, y: 0},
    [Move.space]: {x: 0, y: 0}
};

function handleUp() {

}

function handleSpace() {

}

function deletePiece(board: number[][], piece: IPiece) {
    let canDelete = true;
    piece.space.forEach(offSet => {
        if (board[piece.position.x + offSet.x][piece.position.y + offSet.y] !== piece.code) {
            canDelete = false;
        }
    });

    if (canDelete) {
        deleteLowPiece(board, piece);
        piece.space.forEach(offSet => board[piece.position.x + offSet.x][piece.position.y + offSet.y] = 0);
    }
}

function deleteLowPiece(board: number[][], piece: IPiece) {
    const lowPoints = findDownPieces(board, piece);
    lowPoints.forEach(point => board[point.x][point.y] = 0);
}

function handleDirectional(game: IGameState, move: IPoint): IGameState {
    // delete piece from board
    deletePiece(game.board, game.currPiece);

    // create new piece
    const newPiece = clonePiece(game.currPiece);
    newPiece.position.x += move.x;
    newPiece.position.y += move.y;

    // try place the newPiece, if you cannot, place the old piece
    if (!tryPlacePiece(game.board, newPiece)) {
        tryPlacePiece(game.board, game.currPiece);
    }
    else {
        game.currPiece = newPiece;
    }

    return game;
}

function updateGame(game: IGameState, move: Move): IGameState {
    switch (move) {
        case Move.up:
            break;
        case Move.space:
            break;
        default:
            return handleDirectional(game, moveMap[move]);
    }
}

const Tetris = () => {
    const styles = useStyles();
    const [game, setGame] = useState<IGameState>(null);
    const inputRef = useRef(null);

    function onKeyDown(event: any) {
        const clonedGame = cloneGame(game);
        if (event.key === "ArrowLeft") {
            setGame(updateGame(clonedGame, Move.left));
        }
        else if (event.key === "ArrowRight") {
            setGame(updateGame(clonedGame, Move.right));
        }
        else if (event.key === "ArrowUp") {
            setGame(updateGame(clonedGame, Move.up));
        }
        else if (event.key === "ArrowDown") {
            setGame(updateGame(clonedGame, Move.down));
        }
        else if (event.key === " ") {
            setGame(updateGame(clonedGame, Move.space));
        }
    }

    return (
        <div>
            <button onClick={() => { setGame(start()); inputRef.current.focus(); }}>Start</button>
            <div onKeyDown={onKeyDown} ref={inputRef} tabIndex={0}>
                {
                    ROWS.map(i =>
                        <div className={styles.row} key={i}>
                            {COLS.map(j =>
                                <div className={styles.square} key={j} style={game != null && game.board[i][j] in codeToColor ? { backgroundColor: codeToColor[game.board[i][j]] } : {}}>
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