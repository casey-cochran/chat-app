import { useEffect } from "react";
import { csrfFetch } from "../../store/csrf";


const HomeTest = () => {

    const fetchTest = async() => {
        const res = await csrfFetch('/another/test')
        const data = await res.json()
        console.log(data);
    }

    useEffect(() => {
        fetchTest();
    },[])

    return (
        <div>
            hello
        </div>
    )
}

export default HomeTest;
