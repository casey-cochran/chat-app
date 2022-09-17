import './Message.css';


const Messages = ({message, owned}) => {

    return (
        <>
        <div  className={owned ? 'owned' : 'notOwned'}>
            <div className={owned ? 'ownedMessage' : 'notOwnedMessage'}>{message} </div>
        </div>
        </>
    )
}


export default Messages;
