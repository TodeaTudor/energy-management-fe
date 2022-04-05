import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";
import React from 'react'
import Login from './login/login'
import Home from './home/home'

function Routes() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route
                        exact
                        path='/login'
                        render={() => <Login/>}
                    />
                    <Route
                        exact
                        path='/'
                        render={() => <Home/>}
                    />
                </Switch>
            </Router>
        </div>

    );

}

export default Routes;