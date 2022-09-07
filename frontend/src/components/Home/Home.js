import { useEffect, useState } from "react";
import Socket from "../Socket/Socket";
import { csrfFetch } from '../../store/csrf';
import { useSelector } from 'react-redux';
import Conversation from "../Conversation/Conversation";


const Home = () => {
    //change user to just user and key into id
    //that way can get user name to display all his convos
    //map convos and set current the ony clicked and show that ones chat
    const user = useSelector((state) => state.user?.user)
    const conversation = useSelector((state) => state.conversation?.conversation)
    const [conversations, setConversations] = useState([]);
    const [currentConvo, setCurrentConvo] = useState(null);

    useEffect(() => {
        //fetch conversations here
        const getUserConversations = async() => {
            const conversation = await csrfFetch(`/conversation/${user._id}`)
            const response = await conversation.json();
            const {rooms} = response;

            setConversations([...conversations, ...rooms])
        }
        getUserConversations();
    },[]);


    return (
        <div className="d-flex w-100 min-vh-100">
            <div className="w-25">
                {conversations?.map((convo, idx) => {
                    return (
                        <div key={idx}>
                        <Conversation convo={convo} userId={user.id} />
                        </div>
                    )
                })}
            </div>
            <Socket currentConvo={conversation}/>
            <div className="w-25">
                online users here
            </div>
        </div>
    )
}

export default Home;
