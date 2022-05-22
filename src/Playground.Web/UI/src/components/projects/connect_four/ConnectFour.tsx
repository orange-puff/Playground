import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ConnectFourStartInput from './ConnectFourStartInput';

const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:5001/hubs/game')
    .withAutomaticReconnect()
    .build();

const ConnectFour = () => {
    const [startGameMessage, setStartGameMessage] = useState<string>('');

    useEffect(() => {
        connection.start()
            .then(result => {
                console.log('Connected!');
            })
            .catch(e => console.log('Connection failed: ', e));

        connection.on("StartGame", (startGameResponse) => {
            if (!startGameResponse.valid) {
                setStartGameMessage('Invalid. Something is wrong :(');
            }
            else {
                if (startGameResponse.waiting) {
                    setStartGameMessage('Waiting for opponent...');
                }
                else {
                    setStartGameMessage('Ready to play!');
                }
            }
        });
    }, []);

    const sendMessage = async (user: string, gameCode: string) => {
        const startGameRequest = {
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
        <div>
            <ConnectFourStartInput sendMessage={sendMessage} startGameMessage={startGameMessage}/>
        </div>
    );
};

export default ConnectFour;

