import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";


const Conversation = ({convo, userId}) => {
    const [friend, setFriend] = useState(null);


    useEffect(() => {
        const friendId = convo.members.find((user) => user !== userId);
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

    return(
        <div className="w-25">{friend}</div>
    )
}


export default Conversation;
