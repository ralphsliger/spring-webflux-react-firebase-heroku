import React from 'react'
import '../styles/Sidebar.css'
import pregunta from '../img/pregunta.png'
import {Link} from 'react-router-dom';

import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

import { useHistory } from "react-router-dom"

const auth = firebase.auth();




const Sidebar = () => {

    const {location} = useHistory();
    const {pathname} = location

    const [user] = useAuthState(auth);

    return (
        <div className="sidebar">
            
            <img src={pregunta} alt="Icon"/>
            
            <div className="sidebar_menu">
                <ul className="menu">
                    <li title="home"><Link to="/" className={pathname === '/' ? "active home" : 'home'}>home</Link></li>
                    <li title="question"><Link to="/questions" className={pathname === '/questions' ? "active question" : 'question'}>Questions</Link></li>
                    {user &&  <li title="new"><Link to="/new" className={pathname === '/new' ? "active new" : 'new'}>New </Link></li>}
                    {user && <li title="list"><Link to="/list" className={pathname === '/list' ? "active list" : 'list'}>List</Link></li>}      
                    {!user && <li title="login"><Link to="/login" className={pathname === '/login' ? "active login" : 'login'}>Login</Link></li>}
                </ul>
            </div>
            <div>
               
            </div>
            
        </div>
    )
}

export default Sidebar
