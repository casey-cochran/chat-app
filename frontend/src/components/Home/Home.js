import { useEffect, useState } from "react";
import Socket from "../Socket/Socket";
import { csrfFetch } from '../../store/csrf';
import { useSelector } from 'react-redux';


const Home = () => {
    //change user to just user and key into id
    //that way can get user name to display all his convos
    //map convos and set current the ony clicked and show that ones chat
    const user = useSelector((state) => state.user?.user?._id)
    const [conversations, setConversations] = useState([]);
    const [currentConvo, setCurrentConvo] = useState(null);

    useEffect(() => {
        //fetch conversations here
        const getUserConversations = async() => {
            const conversation = await csrfFetch(`/conversation/${user}`)
            const response = await conversation.json();
            const {rooms} = response;
            setConversations([...conversations, ...rooms])
        }
        getUserConversations();
    },[])

    return (
        <div className="d-flex w-100 min-vh-100">
            <div className="w-25">hello from home</div>
            <Socket conversations={conversations}/>
            <div className="w-25">
                online users here
            </div>
        </div>
    )
}

export default Home;
