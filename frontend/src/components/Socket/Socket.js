import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';
import { csrfFetch } from '../../store/csrf';

const Socket = ({currentConvo}) => {
    const user = useSelector((state) => state.user?.user)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [convoMessages, setConvoMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [chatInput, setChatInput] = useState('');
    const socket = useRef()

    const receiverId = currentConvo?.members.find(member => member !== user._id)
    console.log(receiverId, 'whats thsi id ')

    const sendChat = async(e) => {
        e.preventDefault();
        //possible post messages here ?
        const saveMessage = {
            chatRoomId: currentConvo._id,
            userId: user.id,
            text: newMessage
        }
        //move post message function so that you can send messages
        //when user is offline, then need to work out handling errors
        //for sending messages when user online/offline?
        const postMessage = async() => {
         const response = await csrfFetch('/message', {
            method: "POST",
            body: JSON.stringify(saveMessage)
        })
        const data = await response.json()
        console.log(data)
        }
        postMessage();
        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage
        });
        setNewMessage('');
    }

    useEffect(() => {
        socket.current = io("ws://localhost:5000")
    },[])

    useEffect(() => {
        socket.current.on('getMessage', data => {
            console.log(data,' did  Irecieve data')
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[])

    useEffect(() => {
        // console.log(currentConvo?.members.includes(arrivalMessage.sender))
        // arrivalMessage && currentConvo?.members.includes(arrivalMessage.sender) &&
        arrivalMessage && currentConvo?.members.includes(arrivalMessage.sender) &&
        arrivalMessage &&
        // setMessages(arrivalMessage.text)
        setMessages((prev) => [...prev, arrivalMessage?.text])
        console.log(messages)
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        const getMessages = async(currentConvoId) => {
            const response = await csrfFetch(`/message/${currentConvoId}`);
            const data = await response.json();
            console.log(data, 'this should be rendering messages?')
            setConvoMessages([...convoMessages, ...data.messages]);
        }
        getMessages(currentConvo?._id);
    },[currentConvo?._id])

    useEffect(() => {
        //Need to add receiverId to users when loading a chat so that I can send them messages
        socket.current.emit('addUser', user._id)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
    },[user._id])

    useEffect(() => {
        socket.current.on('recieved', (chat) => {
            setMessages([...messages, chat]);
        })
        return (() => socket.current.disconnect())
    }, [socket])

    return (
        <div className='flex-grow-1'>
            {convoMessages?.map((message, i) => {
                return (
                <div key={i}>{message.text}</div>
                )
            })}
            <form onSubmit={sendChat}>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
            <div>
                {messages?.map((message, idx) => {
                    return (
                        <div key={idx}>{message}</div>
                    )
                })}
            </div>
        </div>

    )
}

export default Socket;
