import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';

let socket;

const Socket = () => {
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', {msg: chatInput});
        setChatInput('');
    }

    useEffect(() => {
        socket = io();

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat]);
        })

        return (() => socket.disconnect())
    })

    return (
        <div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={setChatInput}
                />
                <button type='submit'>Send</button>
            </form>
            <div>
                {messages?.map((message, idx) => {
                    <div key={idx}>{message.msg}</div>
                })}
            </div>
        </div>

    )
}

export default Socket;
