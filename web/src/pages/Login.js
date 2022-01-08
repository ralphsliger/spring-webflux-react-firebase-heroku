import React,{useState} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login } from "../actions/authActions";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

firebase.initializeApp({
  apiKey: "AIzaSyCygfSWA8dawZmbxz289Lai5Ge2qb38_YY",
  authDomain: "questionapp-deploy.firebaseapp.com",
  projectId: "questionapp-deploy",
  storageBucket: "questionapp-deploy.appspot.com",
  messagingSenderId: "897291230924",
  appId: "1:897291230924:web:ea2f7147400f7b929e2c69"
});

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

const signin = (email, password)=>{
	return auth().signInWithEmailAndPassword(email, password);
}

const auth = firebase.auth();

const Login = ({ dispatch }) => {

    const [userData, setuserData] = useState({
        email:'',
        password:''
    })

    const handleInputChange = (event) => {
        setuserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    }

    const loginUser = (event) => {
        event.preventDefault()
        return auth.signInWithEmailAndPassword(userData.email, userData.password)
            .then(()=>{
                Swal.fire('¡Bienvenido a Answer App!')
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: '¡Algo esta mal!',
                    text: 'Usuario o contraseña invalida'
                })
            })
    }


    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid));
    }

    return (
        <div className="login-container">
            <form className="form-login" onSubmit={loginUser}>
                <input
                    type="text"
                    id="login"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={userData.email}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingrese contraseña"
                    onChange={handleInputChange}
                    value={userData.password}
                />
                <button type="submit" className="btn-login btn-email">Iniciar Sesión</button>
                <button
                    type="button"
                    className="btn-login btn-google"
                    onClick={signInWithGoogle}
                >Iniciar sesión con google<i class="fab fa-google"></i></button>
            </form>
            <p>¿Aún no te has registrado?<Link to="/Register">Regístrate</Link></p>
        </div>
    )
}

export default Login