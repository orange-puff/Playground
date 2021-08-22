import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ROWS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const COLS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function indexGood(i: number, j: number) {
    return i >= 0 && i < ROWS.length && j >= 0 && j < COLS.length;
}

const LOW_CODE = 8;
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

const codeToSpace: { [key: number]: IPoint[][] } = {
    1: [
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
    2: [
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
    3: [
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
    4: [
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
    5: [
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ]
    ],
    6: [
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

function rotatePiece(piece: IPiece): IPiece {

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
        color: codeToColor[1],
        position: { x: 0, y: 4 },
        space: codeToSpace[1][0],
        code: 1
    }
}

function constructZBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[2],
        position: { x: 0, y: 4 },
        space: codeToSpace[2][0],
        code: 2
    }
}

function constructLBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[3],
        position: { x: 0, y: 4 },
        space: codeToSpace[3][0],
        code: 3
    }
}

function constructJBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[4],
        position: { x: 0, y: 4 },
        space: codeToSpace[4][0],
        code: 4
    }
}

function constructOBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[5],
        position: { x: 0, y: 4 },
        space: codeToSpace[5][0],
        code: 5
    }
}

function constructIBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[6],
        position: { x: 0, y: 4 },
        space: codeToSpace[6][0],
        code: 6
    }
}

function constructTBlock(): IPiece {
    return {
        spaceInd: 0,
        color: codeToColor[7][0],
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
 * Different functionalities;
 * Generate new piece
 * place silohuette of piece
 * handle key
 *
 *
 * up -> rotate and place solohette
 * left, right, down -> make move and place silohette
 * space -> move down until you cannot anymore and generate new piece
 */