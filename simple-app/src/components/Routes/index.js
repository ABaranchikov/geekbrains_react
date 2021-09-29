import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Home } from '../Home';
import { Chats } from '../Chats';
import { Profile } from '../Profile';
import { Memes } from '../Memes';

export const Routes = () => {
    return (
        <BrowserRouter>
            <Link className="Menu" to="/">Home</Link>
            <Link className="Menu" to="/memes">Memes</Link>
            <Link className="Menu" to="/chats">Chats</Link>
            <Link className="Menu" to="/profile">Profile</Link>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/chats/:chatId?">
                    <Chats />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/memes" component={Memes} />
                <Route>
                    <h4>404</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}