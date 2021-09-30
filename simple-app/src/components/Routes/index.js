import { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Home } from '../Home';
import { Chats } from '../Chats';
import { Profile } from '../Profile';
import { Memes } from '../Memes';
import { PublicRoute } from '../PublicRoute';
import { PrivateRoute } from '../PrivateRoute';
import { login, signUp, signOut, auth } from '../../services/firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { setAuthed } from '../../store/profile/actions';

export const Routes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('login');
            console.log(user);
            if (user) {
                dispatch(setAuthed(true));
            } else {
                dispatch(setAuthed(false));
            }
        });
        return unsubscribe;
    }, []);

    const handleLogin = async (email, pass) => {
        try {
            await login(email, pass);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignUp = async (email, pass) => {
        try {
            await signUp(email, pass);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        console.log("logout");
        try {
            await signOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BrowserRouter>
            <Link className="Menu" to="/login">Login</Link>
            <Link className="Menu" to="/memes">Memes</Link>
            <Link className="Menu" to="/chats">Chats</Link>
            <Link className="Menu" to="/profile">Profile</Link>
            <Switch>
                <PublicRoute path="/login" exact>
                    <Home onLogin={handleLogin} />
                </PublicRoute>
                <PublicRoute path="/signup" exact >
                    <Home onSignUp={handleSignUp} />
                </PublicRoute>
                <PrivateRoute path="/chats/:chatId?">
                    <Chats />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                    <Profile onLogout={handleLogout} />
                </PrivateRoute>
                <Route path="/memes" component={Memes} />
                <Route>
                    <h4>404</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}