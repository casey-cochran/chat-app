import Socket from "../Socket/Socket";


const Home = () => {

    return (
        <div className="d-flex w-100 min-vh-100">
            <div className="w-25">hello from home</div>
            <Socket />
            <div className="w-25">
                online users here
            </div>
        </div>
    )
}

export default Home;
