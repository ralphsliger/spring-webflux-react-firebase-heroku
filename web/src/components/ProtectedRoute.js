import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const auth = firebase.auth();

const ProtectedRoute = ({path, component}) => {

    const [user] = useAuthState(auth);

    return (
        <div>
            {
                user ?

                <Route exact path={path} component={component} /> 

                : 
                
                <Redirect to="/" />


            }
            
        </div>
    )
}

export default ProtectedRoute
