import { useDispatch, useSelector } from "react-redux";
import { toggleCheckBox } from "../../store/profile/actions";
import { selectProfileChecked } from '../../store/profile/selectors';

export const Profile = () => {
    const checked = useSelector(selectProfileChecked);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleCheckBox)
    };
    return (
        <>
            <h3>This is Profile page</h3>
            <div>
                <input type="checkbox" id="scales" name="scales" readOnly checked={checked}/>
                <label >Checkbox</label>
            </div>
            <button onClick={handleClick}>Click to change state</button>
        </>
    );
}