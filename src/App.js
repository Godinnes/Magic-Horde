import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './App.css';

const client = new W3CWebSocket('ws://localhost:3001');

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isServerFull, setIsServerFull] = useState(false);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.error) {
                setIsServerFull(true);
            } else {
                setBoard(data.board);
            }
        };
    }, []);

    const handleClick = (index) => {
        const newBoard = board.slice();
        newBoard[index] = 'X'; // Simples exemplo, você pode mudar a lógica conforme necessário
        setBoard(newBoard);
        client.send(JSON.stringify({ board: newBoard }));
    };

    if (isServerFull) {
        return <div>O servidor está cheio. Tente novamente mais tarde.</div>;
    }

    return (
        <div className="App">
            <div className="board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className="cell"
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
