import { useDispatch, useSelector } from "react-redux";
import { toggleCheckBox } from "../../store/profile/actions";

export const Profile = () => {
    const checked = useSelector((state) => state.checked);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleCheckBox)
    };
    return (
        <>
            <h3>This is Profile page</h3>
            <div>
                <input type="checkbox" id="scales" name="scales" checked={checked}/>
                <label for="scales">Checkbox</label>
            </div>
            <button onClick={handleClick}>Click to change state</button>
        </>
    );
}