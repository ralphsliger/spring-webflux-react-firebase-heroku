import React, { useEffect , useState} from "react";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { connect } from 'react-redux'
import { Question } from '../components/Question'
import { Richtext } from "../components/Richtext";

const FormPage = ({ dispatch, loading, redirect, match,hasErrors, question, userId }) => {

    const [content, setContent] = useState('');
    
    const { id } = match.params
    
    const history = useHistory();

    const input = ({answer}) => {
        if(answer.length && answer.length <=500) {
            return true;
        }
        return false;
    }

    const onSubmit = e => {
        e.preventDefault();
        const data = {
            userId,
            questionId:id,
            answer:content
        }
        input(data) && dispatch(postAnswer(data));
    }

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={question} />
    }

    return (
        <section>
            {renderQuestion()}
            <h1>New Answer</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="answer">Answer</label>
                    <Richtext id="answer" setContent={setContent} />
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)