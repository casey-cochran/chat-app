


const Messages = ({message, owned}) => {
    const ownMessage = {
        backgroundColor: 'blue'
    }
    const notOwned = {
        backgroundColor: 'red'
    }
    return (
        <>
        <div style={owned ? ownMessage : notOwned}>
            {message}
        </div>
        </>
    )
}


export default Messages;
