import { useEffect, useState } from "react";
import { initUserName, setUserNameFb } from "../../store/profile/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../../store/profile/selectors";

export const Profile = ({ onLogout }) => {
    const dispatch = useDispatch();
    const name = useSelector(selectUserName);

    const [value, setValue] = useState("");
    const handleLogout = () => {
        onLogout();
    }

    useEffect(() => {
        dispatch(initUserName());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setUserNameFb(value));
        setValue("");
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
            
        
            <h2>{name}</h2>
        </>
    );
}