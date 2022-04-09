import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    ],
    [T_BLOCK_CODE]: [
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 1 }
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 }
        ],
        [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ],
        [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
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
    body: {
        margin: "auto",
        width: "20%",
        marginTop: "20px"
    },
    square: {
        height: "20px",
        width: "20px",
        border: "1px solid #999",
        float: "left"
    },
    row: {
        display: "table"
    },
    text: {
        margin: "auto",
        width: "30%",
        border: "3px solid black",
        marginTop: "20px",
        textAlign: "center"
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
        space: codeToSpace[T_BLOCK_CODE][0],
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

function tryPlacePiece(board: number[][], piece: IPiece): boolean {
    let canPlace: boolean = true;
    piece.space.forEach(offset => {
        let i = piece.position.x + offset.x;
        let j = piece.position.y + offset.y;
        if (!indexGood(i, j) || (board[i][j] !== 0 && board[i][j] !== LOW_BLOCK_CODE)) {
            canPlace = false;
        }
    });

    if (canPlace) {
        piece.space.forEach(offset => board[piece.position.x + offset.x][piece.position.y + offset.y] = piece.code);
        placeLowPoints(board, piece);
    }

    return canPlace;
}

function pointsContain(points: IPoint[], point: IPoint): boolean {
    let contains = false;
    points.forEach(p => contains = contains || (p.x === point.x && p.y === point.y));
    return contains;
}

function findLowPoints(board: number[][], piece: IPiece): IPoint[] {
    const low: IPiece = clonePiece(piece);

    let lowPoints: IPoint[] = [];
    let downx: number = low.position.x;
    const piecePoints: IPoint[] = [];
    piece.space.forEach(p => piecePoints.push({ x: p.x + piece.position.x, y: p.y + piece.position.y }));
    while (true) {
        downx = downx + 1;
        const downPoints: IPoint[] = [];
        piece.space.forEach(offSet => {
            downPoints.push({ x: downx + offSet.x, y: piece.position.y + offSet.y });
        });

        let canPlace = true;
        downPoints.forEach(point => {
            canPlace = canPlace && indexGood(point.x, point.y) && (board[point.x][point.y] === 0 || pointsContain(piecePoints, point) || board[point.x][point.y] === LOW_BLOCK_CODE);
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

function placeLowPoints(board: number[][], piece: IPiece) {
    const lowPoints = findLowPoints(board, piece);
    lowPoints.forEach(point => {
        if (board[point.x][point.y] === 0) {
            board[point.x][point.y] = LOW_BLOCK_CODE;
        }
    });
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
    [Move.up]: { x: 0, y: 0 },
    [Move.space]: { x: 0, y: 0 }
};

function rowCheck(board: number[][]): boolean {
    let validRowCheck: boolean = false;
    let rowCheckStartIndex: number = 0;
    // clear all full rows
    for (let i = 0; i < board.length; i++) {
        let fullRow: boolean = true;
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 0 || board[i][j] === LOW_BLOCK_CODE) {
                fullRow = false;
                break;
            }
        }

        if (fullRow) {
            for (let j = 0; j < board[0].length; j++) {
                board[i][j] = 0;
            }
            rowCheckStartIndex = Math.max(rowCheckStartIndex, i);
        }
        validRowCheck = validRowCheck || fullRow;
    }

    if (!validRowCheck) {
        return validRowCheck;
    }

    // anything above the deleted rows needs to be moved down
    for (let i = rowCheckStartIndex; i >= 0; i--) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 0) {
                continue;
            }
            let k: number = i;
            while (k + 1 <= rowCheckStartIndex && board[k + 1][j] === 0) {
                board[k + 1][j] = board[k][j];
                board[k][j] = 0;
                k += 1;
            }
        }
    }

    return validRowCheck;
}

function deletePiece(board: number[][], piece: IPiece) {
    let canDelete = true;
    piece.space.forEach(offSet => {
        if (board[piece.position.x + offSet.x][piece.position.y + offSet.y] !== piece.code) {
            canDelete = false;
        }
    });

    if (canDelete) {
        deleteLowPoints(board, piece);
        piece.space.forEach(offSet => board[piece.position.x + offSet.x][piece.position.y + offSet.y] = 0);
    }
}

function deleteLowPoints(board: number[][], piece: IPiece) {
    const lowPoints = findLowPoints(board, piece);
    lowPoints.forEach(point => {
        if (board[point.x][point.y] === LOW_BLOCK_CODE) {
            board[point.x][point.y] = 0;
        }
    });
}

function handleUp(game: IGameState): IGameState {
    // delete piece
    deletePiece(game.board, game.currPiece);

    // adjust piece
    const newPiece = clonePiece(game.currPiece);
    const newSpaceInd: number = (newPiece.spaceInd + 1) % codeToSpace[newPiece.code].length;
    newPiece.space = codeToSpace[newPiece.code][newSpaceInd];
    newPiece.spaceInd = newSpaceInd;

    // try to place adjusted piece
    if (!tryPlacePiece(game.board, newPiece)) {
        tryPlacePiece(game.board, game.currPiece);
    }
    else {
        // if we cannot, reset the piece
        game.currPiece = newPiece;
    }

    return game;
}

function handleSpace(game: IGameState): IGameState {
    // delete piece
    deletePiece(game.board, game.currPiece);

    // move piece up, so it always can go down
    game.currPiece.position.x -= 1;

    // find low points
    const lowPoints = findLowPoints(game.board, game.currPiece);

    // place piece at low points
    lowPoints.forEach(point => game.board[point.x][point.y] = game.currPiece.code);

    // trigger row check
    rowCheck(game.board);

    // game gets new piece
    game.currPiece = generateRandomBlock();
    if (!tryPlacePiece(game.board, game.currPiece)) {
        return initGame();
    }
    return game;
}

function handleDirectional(game: IGameState, move: Move): IGameState {
    // delete piece from board
    deletePiece(game.board, game.currPiece);

    // create new piece
    const movePos = moveMap[move];
    const newPiece = clonePiece(game.currPiece);
    newPiece.position.x += movePos.x;
    newPiece.position.y += movePos.y;

    // try place the newPiece, if you cannot, place the old piece
    if (!tryPlacePiece(game.board, newPiece)) {
        tryPlacePiece(game.board, game.currPiece);
        // time to generate a new piece
        if (rowCheck(game.board) || move === Move.down) {
            game.currPiece = generateRandomBlock();
            if (!tryPlacePiece(game.board, game.currPiece)) {
                return initGame();
            }
        }
    }
    else {
        game.currPiece = newPiece;
    }

    return game;
}

function updateGame(game: IGameState, move: Move): IGameState {
    switch (move) {
        case Move.up:
            return handleUp(game);
        case Move.space:
            return handleSpace(game);
        default:
            return handleDirectional(game, move);
    }
}

const Tetris = () => {
    const styles = useStyles();
    const [game, setGame] = useState<IGameState>(null);
    const [useless, setUseless] = useState<number>(0);
    const inputRef = useRef(null);

    function onKeyDown(event: any) {
        const clonedGame: IGameState = cloneGame(game);
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

    function startGame() {
        setGame(start());
        setInterval(() => {
            setUseless((oldUseless) => {
                return oldUseless + 1;
            })
        }, 2000);
    }

    useEffect(() => {
        if (game != null) {
            setGame(updateGame(game, Move.down));
        }
    }, [useless]);

    return (
        <div>
            <div className={styles.body}>
                <button onClick={() => { startGame(); inputRef.current.focus(); }}>Start</button>
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
        </div>
    );
}

export default Tetris;