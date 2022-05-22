import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ConnectFourStartInput from './ConnectFourStartInput';
import { StartGameRequest, StartGameResponse } from './Models';
import ConnectFourBoard from './ConnectFourBoard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        textAlign: 'center'
    }
}));

const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:5001/hubs/game')
    .withAutomaticReconnect()
    .build();

const ConnectFour = () => {
    const [startGameMessage, setStartGameMessage] = useState<string>('');
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const styles = useStyles();

    useEffect(() => {
        connection.start()
            .then(result => {
                console.log('Connected!');
            })
            .catch(e => console.log('Connection failed: ', e));

        connection.on("StartGame", (startGameResponse: StartGameResponse) => {
            if (!startGameResponse.valid) {
                setStartGameMessage('Invalid. Something is wrong :(');
            }
            else {
                if (startGameResponse.waiting) {
                    setStartGameMessage('Waiting for opponent...');
                }
                else {
                    setGameStarted(true);
                    setStartGameMessage('Ready to play!');
                }
            }
        });
    }, []);

    const sendMessage = async (user: string, gameCode: string) => {
        const startGameRequest: StartGameRequest = {
            user: user,
            gameCode: gameCode
        };
        try {
            await connection.invoke("StartGame", startGameRequest);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.body}>
            <ConnectFourStartInput sendMessage={sendMessage} startGameMessage={startGameMessage} gameStarted={gameStarted} />
            <ConnectFourBoard gameStarted={gameStarted} />
        </div>
    );
};

export default ConnectFour;

