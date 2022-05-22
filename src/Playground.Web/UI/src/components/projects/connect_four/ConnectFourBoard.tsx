import React, { useState, useEffect } from 'react';

const ConnectFourBoard = (props: any) => {
    return (
        <div>
            {
                !props.gameStarted
                    ? <p>Ask a friend to start a game</p>
                    : <p>game on</p>
            }
        </div>);
}

export default ConnectFourBoard;