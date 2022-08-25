import { useEffect } from "react";


const HomeTest = () => {

    const fetchTest = async() => {
        const res = await fetch('http://localhost:5000/test')
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
