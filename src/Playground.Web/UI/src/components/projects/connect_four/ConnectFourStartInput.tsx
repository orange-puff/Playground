import React, { useState } from 'react';

const ConnectFourStartInput = (props: any) => {
    const [user, setUser] = useState<string>('');
    const [gameCode, setGameCode] = useState<string>('');

    const onSubmit = (e: any) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isGameCodeProvided = gameCode && gameCode !== '';

        if (isUserProvided && isGameCodeProvided) {
            props.sendMessage(user, gameCode);
        }
        else {
            alert('Please insert an user and a game code.');
        }
    }

    const onUserUpdate = (e: any) => {
        setUser(e.target.value);
    }

    const onGameCodeUpdate = (e: any) => {
        setGameCode(e.target.value);
    }

    return (
        <div>
            <form
                onSubmit={onSubmit}>
                <label htmlFor="user">User:</label>
                <br />
                <input
                    id="user"
                    name="user"
                    value={user}
                    onChange={onUserUpdate} />
                <br />
                <label htmlFor="gameCode">GameCode:</label>
                <br />
                <input
                    type="text"
                    id="gameCode"
                    name="gameCode"
                    value={gameCode}
                    onChange={onGameCodeUpdate} />
                <br /><br />
                <button>Submit</button>
            </form>
            <p>{props.startGameMessage}</p>
        </div>
    )
}

export default ConnectFourStartInput;
