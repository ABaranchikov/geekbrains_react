import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectAuthed } from "../../store/profile/selectors";

export const PrivateRoute = ({ ...props }) => {
    const authed = useSelector(selectAuthed);
    return authed ? <Route {...props} /> : <Redirect to="/login" />
}