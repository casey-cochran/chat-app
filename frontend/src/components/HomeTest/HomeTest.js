import { useEffect } from "react";
import { restoreCSRF } from "../../store/csrf";


const HomeTest = () => {

    const fetchTest = async() => {
        const res = await fetch('http://localhost:5000/test')
        const data = await res.json()
        console.log(data);
    }

    useEffect(() => {
        // fetchTest();
        restoreCSRF()
    },[])

    return (
        <div>
            hello
        </div>
    )
}

export default HomeTest;
