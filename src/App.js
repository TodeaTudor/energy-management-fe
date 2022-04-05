import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react'
import Login from './login/login'
import Home from './home/home'
import ClientHomepage from "./client/client-homepage";
import AdminHomepage from "./admin/admin-homepage";
import ClientsComponent from "./admin/clients/admin-clients";
import ProtectedRoute from "./commons/protected-route";
import DevicesComponent from "./admin/devices/admin-devices";
import ClientDevices from "./client/client-devices";
import RegisterComponent from "./login/register-form";

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <ProtectedRoute
                        exact
                        path='/login'
                        component={Login}
                    />
                    <Route
                        exact
                        path='/'
                        render={() => <Home/>}
                    />
                    <Route
                        exact
                        path='/register'
                        render={() => <RegisterComponent/>}
                    />
                    <ProtectedRoute
                        exact
                        path='/client'
                        component={ClientHomepage}
                    />
                    <ProtectedRoute
                        exact
                        path='/client/profile'
                        component={ClientDevices}
                    />
                    <ProtectedRoute
                        exact
                        path='/admin'
                        component={AdminHomepage}
                    />
                    <ProtectedRoute
                        exact
                        path='/admin/clients'
                        component={ClientsComponent}
                    />
                    <ProtectedRoute
                        exact
                        path='/admin/devices'
                        component={DevicesComponent}
                    />


                </Switch>
            </Router>
        </div>

    );

}

export default App;
