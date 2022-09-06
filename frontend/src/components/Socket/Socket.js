import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';
import { csrfFetch } from '../../store/csrf';

const Socket = ({currentConvoId}) => {
    const user = useSelector((state) => state.user?.user)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [convoMessages, setConvoMessages] = useState([]);

    const [chatInput, setChatInput] = useState('');
    let socket = useRef(io())

    // const receiverId = currentChat.members.find(member => member !== user)

    const sendChat = (e) => {
        e.preventDefault();
        socket.current.emit('sendMessage', {
            senderId: user._id,
            // receiverId,
            text: newMessage
        });
        setChatInput('');
    }

    // useEffect(() => {
    //     socket.current.on('getMessage', data => {

    //     })
    // },[])

    useEffect(() => {
        const getMessages = async(currentConvoId) => {
            const response = await csrfFetch(`/message/${currentConvoId}`);
            const data = await response.json();
            setConvoMessages([...convoMessages, ...data.messages]);
        }
        getMessages(currentConvoId);
    },[currentConvoId])

    useEffect(() => {
        //Grab user id from redux state, add it to dependency
        socket.current.emit('addUser', user._id)
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

        console.log(convoMessages)
    return (
        <div className='flex-grow-1'>
            {convoMessages?.map((message, i) => {
                return (
                <div key={i}>{message.text}</div>
                )
            })}
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
