import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login, logout } from './actions/authActions';
import Login from './pages/Login'
import Register from './pages/Register'
import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import HomePage from './pages/HomePage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'


const auth = firebase.auth();

const App = ({ dispatch }) => {

  const [user] = useAuthState(auth);

  if(user){
    dispatch(login(user.email, user.uid))
  }

  return (

    <>
     <Router>
      <Layout >
       
          <Switch>
            <Route exact path="/" component={() => <HomePage><SignOut dispatch={dispatch} /></HomePage>} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/login" component={() => <Login dispatch={dispatch}></Login>} />
            <Route exact path="/register" component={() => <Register dispatch={dispatch}></Register>}/>
            <ProtectedRoute exact path="/list" component={OwnerQuestionsPage} />
            <ProtectedRoute exact path="/answer/:id" component={AnswerFormPage} />
            <ProtectedRoute exact path="/new" component={QuestionFormPage} />
          </Switch>
        
      </Layout>
      </Router>
    
    
    </>
  
  )
}

function SignOut({ dispatch }) {
  return (
    auth.currentUser && (
      <button
        className="button right"
        onClick={() => {
          dispatch(logout())
          auth.signOut();
        }}
      >
        Cerrar sesión <i class="fas fa-sign-in-alt"></i>
      </button>
    )
  );
}


export default App
