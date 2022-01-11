import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { fetchOwnerQuestions, deleteQuestion } from '../actions/questionActions'
import { Question } from '../components/Question'

const OwnerQuestionsPage = ({ dispatch, loading, questions, hasErrors, redirect, userId }) => {
    useEffect(() => {
        dispatch(fetchOwnerQuestions(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (redirect) {
            dispatch(fetchOwnerQuestions(userId))
        }
    }, [redirect, dispatch, userId]);

    const [search, setSearch] = useState('');

    const [categorySearch, setcategorySearch] = useState('');
    
    var questionFilteredCategory = questions.filter(question => question.category.toUpperCase().includes(categorySearch.toUpperCase()));

    var questionsFilteredSearch = questionFilteredCategory.filter(question => question.question.toUpperCase().includes(search.toUpperCase()));

    const goTOVariable = questionsFilteredSearch[0]?.id;

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }

    const onDelete = (id) => {
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar esta pregunta?',
            text: "Será eliminada permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteQuestion(id))
                Swal.fire(
                    'Eliminada',
                    'Tu pregunta ha sido eliminada.',
                    'Eliminada con éxito'
                )
            }
        })
    }


    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        if(questions.length > 0){
            return questions.map(question => <Question
                    key={question.id}
                    question={question}
                    excerpt onDelete={onDelete} />)
            

        }else{
            return <p>No hay ninguna pregunta</p>
        }

       
        
        
    }

    return (
        <section>
            <h1>Questions</h1>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
    redirect: state.question.redirect,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(OwnerQuestionsPage)
