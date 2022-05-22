export interface StartGameRequest {
    user: string;
    gameCode: string;
}

export interface StartGameResponse {
    waiting: boolean;
    valid: boolean;
}