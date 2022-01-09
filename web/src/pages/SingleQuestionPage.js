import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion, deleteAnswer } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import QuestionReviewForm from '../components/QuestionReviewForm'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  redirect,
  userId
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch,redirect, id])

  const onDelete = (id) => {

    Swal.fire({
        title: '¿Estas seguro que deseas eliminarlo?',
        text: "Será eliminado permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'cancelar',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteAnswer(id))
            Swal.fire(
                'Eliminado',
                'tu respuesta ha sido eliminada.',
                'success'
            )
        }
    })

}

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <div>
      <Question question={question} />
      <QuestionReviewForm question={question}/>
    </div>
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} userId={userId} onDelete={onDelete}/>
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  redirect:state.question.redirect,
  userId: state.auth.uid
})

export default connect(mapStateToProps)(SingleQuestionPage)
