import { useEffect, useState } from "react";
import Socket from "../Socket/Socket";
import { csrfFetch } from '../../store/csrf';
import { useSelector } from 'react-redux';
import Conversation from "../Conversation/Conversation";
import { useDispatch } from "react-redux";
import { addConversation } from "../../store/conversationSlice";
import './Home.css';


const Home = () => {
    //change user to just user and key into id
    //that way can get user name to display all his convos
    //map convos and set current the ony clicked and show that ones chat
    const user = useSelector((state) => state.user?.user)
    const dispatch = useDispatch();
    const conversation = useSelector((state) => state.conversation?.conversation)
    const [conversations, setConversations] = useState([]);

    const setCurrConvo = (convo) => {
        dispatch(addConversation(convo));
      }

    useEffect(() => {
        //fetch conversations here
        //TODO try catch here ?
        const getUserConversations = async() => {
            const conversation = await csrfFetch(`/conversation/${user._id}`)
            const response = await conversation.json();
            const {rooms} = response;

            setConversations([...conversations, ...rooms])
        }
        getUserConversations();
    },[]);


    return (
        <div className="d-flex w-100 calc-height ">
            <div className="w-25">
                {conversations?.map((convo, idx) => {
                    return (
                        <div className="card" onClick={() => setCurrConvo(convo)} key={idx}>
                            <div className="card-body p-5 text-center conv-bg  text-dark bg-opacity-25">
                        <Conversation convo={convo} userId={user.id} />

                            </div>
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
