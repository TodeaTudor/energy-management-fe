import {Redirect, Route} from "react-router-dom";
import React from "react";

const ProtectedRoute = (props) => {
    if (String(props.path).substr(1, 5) === 'admin') {
        if (localStorage.getItem('role') === 'ADMIN') {
            return (<Route exact path={props.path} component={props.component}/>)
        } else if (localStorage.getItem('role') === 'CLIENT') {
            return (<Redirect to='/client'/>);
        } else {
            return (<Redirect to='/'/>);
        }
    } else if (String(props.path).substr(1, 6) === 'client') {
        if (localStorage.getItem('role') === 'CLIENT') {
            return (<Route exact path={props.path} component={props.component}/>)
        } else if (localStorage.getItem('role') === 'ADMIN') {
            return (<Redirect to='/admin'/>);
        } else {
            return (<Redirect to='/'/>);
        }
    } else if (props.path.substr(1, 5) === 'login') {
        if (localStorage.getItem('role') === 'CLIENT') {
            return (<Redirect to='/client'/>);
        } else if (localStorage.getItem('role') === 'ADMIN') {
            return (<Redirect to='/admin'/>);
        } else {
            return (<Route exact path={props.path} component={props.component}/>)
        }
    } else {
        return (<Redirect to='/'/>);
    }
}

export default ProtectedRoute;