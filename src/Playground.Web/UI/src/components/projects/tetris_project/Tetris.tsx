import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ROWS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const COLS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function indexGood(i: number, j: number) {
    return i >= 0 && i < ROWS.length && j >= 0 && j < COLS.length;
}

const LOW_CODE = 8;

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

function generateRandomPiece(): IPiece {
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
            spaceInd: 0,
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
    const currPiece = constructJBlock();
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

function pointsContains(points: IPoint[], point: IPoint): boolean {
    let contains: boolean = false;
    points.forEach(p => {
        if (p.x === point.x && p.y === point.y) {
            contains = true;
        }
    });
    return contains;
}

function getPiecePoints(piece: IPiece): IPoint[] {
    return piece.space.map(p => {
        const toRet: IPoint = { x: p.x + piece.position.x, y: p.y + piece.position.y };
        return toRet;
    });
}

function isValid(board: number[][], piece: IPiece, oldPoints: IPoint[]): boolean {
    const newPoints = getPiecePoints(piece);
    let isValid: boolean = true;
    newPoints.forEach(p => {
        if (!indexGood(p.x, p.y) || (board[p.x][p.y] != 0 && board[p.x][p.y] != 8 && !pointsContains(oldPoints, p))) {
            isValid = false;
        }
    });

    return isValid;
}

function placeLowPoints(trueGame: IGameState) : IGameState {
    const game = cloneGame(trueGame);



}

function findLowPoints(board1: number[][], piece1: IPiece, invalidPoints: IPoint[]): IPoint[] {
    const board: number[][] = [];
    board1.forEach(row => board.push(Object.assign([], row)));
    let piece: IPiece = clonePiece(piece1);
    const tmpPiece: IPiece = clonePiece(piece1);

    const down: IPoint = moveMap[Move.down];

    while (isValid(board, tmpPiece, invalidPoints)) {
        piece = clonePiece(tmpPiece);
        tmpPiece.position = { x: piece.position.x + down.x, y: piece.position.y + down.y };
    }

    let points: IPoint = getPiecePoints(piece);
    points = points.filter(p => !pointsContains(invalidPoints, p));
    return points;
}

function handleDirectionalKey(game: IGameState, move: Move): IGameState {
    let newPiece: IPiece = clonePiece(game.currPiece);

    let newBoard: number[][] = [];
    game.board.forEach(row => newBoard.push(Object.assign([], row)));

    const movePoint: IPoint = moveMap[move];
    newPiece.position = { x: newPiece.position.x + movePoint.x, y: newPiece.position.y + movePoint.y };

    if (isValid(newBoard, newPiece, oldPoints)) {
        /* add new piece to board */
        const newPoints: IPoint[] = getPiecePoints(newPiece);
        newPoints.forEach(p => newBoard[p.x][p.y] = newPiece.code);

        /* find lowest position possible, but never place on current space */
        for (let i = 0; i < ROWS.length; i++) {
            for (let j = 0; j < COLS.length; j++) {
                if (newBoard[i][j] === LOW_CODE) {
                    newBoard[i][j] = 0;
                }
            }
        }

        const lowPoints: IPoint[] = findLowPoints(newBoard, newPiece, newPoints);
        lowPoints.forEach(p => newBoard[p.x][p.y] = LOW_CODE);

        game.board = newBoard;
        game.currPiece = newPiece;
    }
}

function updateGame(game: IGameState, move: Move): IGameState {
    game = cloneGame(game);

    /* create a new piece and see if it can fit on the board */
    let newPiece: IPiece = clonePiece(game.currPiece);

    let newBoard: number[][] = [];
    game.board.forEach(row => newBoard.push(Object.assign([], row)));

    let oldPoints: IPoint[] = getPiecePoints(newPiece);

    if (move === Move.up) {
        newPiece.spaceInd = (newPiece.spaceInd + 1) % codeToSpace[newPiece.code].length;
        newPiece.space = codeToSpace[newPiece.code][newPiece.spaceInd];
    }
    else if (move === Move.space) {
        const tmpCode: number = newPiece.code;
        newPiece.code = 8;
        getPiecePoints(newPiece).forEach(p => newBoard[p.x][p.y] = 8);
        const lowPoints: IPoint[] = findLowPoints(newBoard, newPiece, []);
        newPiece.code = tmpCode;
        lowPoints.forEach(p => newBoard[p.x][p.y] = newPiece.code);
        for (let i = 0; i < ROWS.length; i++) {
            for (let j = 0; j < COLS.length; j++) {
                if (newBoard[i][j] === LOW_CODE) {
                    newBoard[i][j] = 0;
                }
            }
        }
        game.board = newBoard;
        return game;
    }
    else {
        const movePoint: IPoint = moveMap[move];
        newPiece.position = { x: newPiece.position.x + movePoint.x, y: newPiece.position.y + movePoint.y };
    }

    if (isValid(newBoard, newPiece, oldPoints)) {
        /* clear old piece */
        oldPoints.forEach(p => newBoard[p.x][p.y] = 0);

        /* add new piece to board */
        const newPoints: IPoint[] = getPiecePoints(newPiece);
        newPoints.forEach(p => newBoard[p.x][p.y] = newPiece.code);

        /* find lowest position possible, but never place on current space */
        for (let i = 0; i < ROWS.length; i++) {
            for (let j = 0; j < COLS.length; j++) {
                if (newBoard[i][j] === LOW_CODE) {
                    newBoard[i][j] = 0;
                }
            }
        }

        const lowPoints: IPoint[] = findLowPoints(newBoard, newPiece, newPoints);
        lowPoints.forEach(p => newBoard[p.x][p.y] = LOW_CODE);

        game.board = newBoard;
        game.currPiece = newPiece;
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
        else if (event.key === " ") {
            setGame(updateGame(game, Move.space));
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
 * User clicks start:
 * Create random piece
 * Set board values to that piece
 * Find lower points, set the bottom point to gray
 *
 * Create interval job, every second, that applies the moveDown function
 * Have a key listener that handles up, down, left, right
 * Up, Down, Left, Right: remove current pieces space from board. Apply movement to piece. Apply color, lower points
 *
 * After move, apply handler that removes any full rows. If a full row is removed, a new piece must be generated
 */