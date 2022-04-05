import React from 'react'
import {Redirect} from "react-router-dom";

const Home = () => {
    let loggedIn = localStorage.getItem('role');
    if (loggedIn === "CLIENT") {
        return (<Redirect to='/client'/>);
    } else if (loggedIn === "ADMIN") {
        return (<Redirect to='/admin'/>);
    } else {
        return (<Redirect to='/login'/>);
    }

}


export default Home;