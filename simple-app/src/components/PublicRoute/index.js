import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthed } from "../../store/profile/selectors";

export const PublicRoute = ({ ...props }) => {
    const authed = useSelector(selectAuthed);
    return !authed ? <Route {...props} /> : <Redirect to="/profile" />
}