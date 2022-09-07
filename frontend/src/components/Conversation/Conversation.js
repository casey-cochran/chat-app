import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";

import (useState)


const Conversation = ({convo, userId}) => {
    const [currentConvo, setCurrentConvo] = useState(null);
    const [friend, setFriend] = useState(null);


    useEffect(() => {
        const friendId = convo.members.find((user) => user !== userId);
        const fetchFriend = async(friendId) => {
            const response = await csrfFetch(`/user/friend/${friendId}`)
            const data = await response.json();
            console.log(data, ' friend here ?')
            setFriend(data.username);
        }
        fetchFriend(friendId);
    },[])

    const setCurrConvo = (convo) => {
        return setCurrentConvo(convo)
      }

    return(
        <div className="w-25" onClick={() => setCurrConvo(convo._id)}>{friend}</div>
    )
}


export default Conversation;
