import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';

const Socket = () => {
    const user = useSelector((state) => state.user?.user?._id)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [chatInput, setChatInput] = useState('');
    let socket = useRef(io())

    const receiverId = currentChat.members.find(member => member !== user)

    const sendChat = (e) => {
        e.preventDefault();
        socket.current.emit('sendMessage', {
            senderId: user,
            receiverId,
            text: newMessage
        });
        setChatInput('');
    }

    useEffect(() => {
        socket.current.on('getMessage', data => {

        })
    })

    //can add another usestate to track which room your in and query from the db

    useEffect(() => {
        //Grab user id from redux state, add it to dependency
        socket.current.emit('addUser', user)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
    },[])

    useEffect(() => {
        socket.current.on('recieved', (chat) => {
            setMessages([...messages, chat]);
        })
        return (() => socket.current.disconnect())
    }, [socket])

    useEffect(() => {
        //fetch conversations here
    },[])

    return (
        <div className='flex-grow-1'>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
            <div>
                {messages.map((message, idx) => {
                    return (
                        <div key={idx}>{message.msg}</div>
                    )
                })}
            </div>
        </div>

    )
}

export default Socket;
