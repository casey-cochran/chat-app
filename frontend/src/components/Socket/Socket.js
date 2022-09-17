import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';
import { csrfFetch } from '../../store/csrf';
import Messages from '../Messages/Messages';
import './Socket.css';

const Socket = ({currentConvo}) => {
    const user = useSelector((state) => state.user?.user)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [convoMessages, setConvoMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()

    const receiverId = currentConvo?.members.find(member => member !== user._id)

    console.log(messages, ' waht are mesages')
    const sendChat = async(e) => {
        e.preventDefault();
        //possible post messages here ?
        const saveMessage = {
            chatRoomId: currentConvo._id,
            userId: user._id,
            text: newMessage
        }
        setMessages([...messages, saveMessage])
        //move post message function so that you can send messages
        //when user is offline, then need to work out handling errors
        //for sending messages when user online/offline?
        const postMessage = async() => {
         const response = await csrfFetch('/message', {
            method: "POST",
            body: JSON.stringify(saveMessage)
        })
        const data = await response.json()
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
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[])

    useEffect(() => {
        arrivalMessage && currentConvo?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])



    useEffect(() => {
        //reset convo messages when conversation changes to prevent mixing chats
        if(convoMessages.length > 0) setConvoMessages([]);
        const getMessages = async(currentConvoId) => {
            const response = await csrfFetch(`/message/${currentConvoId}`);
            const data = await response.json();
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
        <div className='flex-grow-1 mh-100 position-relative'>
            <div className='calc-height-chat w-100 position-relative overflow-auto'>
            <div className='w-100 mh-100 overflow-auto'>
            {convoMessages?.map((message, i) => {
                return (
                <div  key={i}>
                <Messages message={message.text} owned={message.userId === user._id} />
                </div>
                )
            })}
            </div>
            {/* <div className='position-form'>
            <form onSubmit={sendChat}>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
            </div> */}
            <div >
                {messages?.map((message, idx) => {
                    return (
                        // <div key={idx}>{message}</div>
                        <div  key={idx}>
                        <Messages message={message.text} owned={message.userId === user._id} />
                        </div>
                    )
                })}
            </div>
        </div>
        <div className='position-form w-100'>
            <form className='d-flex w-100' onSubmit={sendChat}>
                <input
                    className='form-control'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type='submit' className='btn btn-primary w-25 '>Send</button>
            </form>
            </div>
        </div>

    )
}

export default Socket;
