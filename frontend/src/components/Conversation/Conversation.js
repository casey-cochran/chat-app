import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import {RiDeleteBack2Line} from 'react-icons/ri';
import './Conversation.css';
import { deleteConversation } from "../../store/conversationSlice";
import { useDispatch } from "react-redux";


const Conversation = ({convo, userId}) => {
    const [friend, setFriend] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const friendId = convo?.members.find((user) => user !== userId);
        const fetchFriend = async(friendId) => {
            //TODO add try catch here for errors
            //May have to add this as a redux state slice
            //since adding a new convo will have to append to this?
            //or just push the new convo on here wihtout doing async call
            const response = await csrfFetch(`/user/friend/${friendId}`)
            const data = await response.json();
            console.log(data, ' friend here ?')
            setFriend(data.username);
        }
        fetchFriend(friendId);
    },[])


    const deleteRoom = async() => {
        const response = await csrfFetch('/conversation/delete', {
            method: "DELETE",
            body: JSON.stringify({convoId: convo._id})
        })
        const data = await response.json();
        dispatch(deleteConversation(convo._id))
        console.log(data)
    }

    return(
        <>
        <div className="w-100 d-flex justify-content-between">
            {friend}
            <RiDeleteBack2Line onClick={deleteRoom} className="icon-delete" />
        </div>

        </>
    )
}


export default Conversation;
