import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { db } from "../../services/firebase";
import { ref, onValue, set } from "@firebase/database";

export const Profile = ({ onLogout }) => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const handleLogout = () => {
        onLogout();
    }

    useEffect(() => {
        const userDbRef = ref(db, "user");
        onValue(userDbRef, (snapshot) => {
            const data = snapshot.val();
            console.log('-------', data);
            setName(data?.username || '');
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue("");
        set(ref(db, "user"), {
            username: value,
        })
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    
    }


    return (
        <>
            <h3>This is Profile page</h3>

            <button onClick={handleLogout}>Logout</button>

            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>

            <div>{name}</div>
        </>
    );
}