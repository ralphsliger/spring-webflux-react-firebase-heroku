import React from "react";
import { connect } from "react-redux";
import { postReview } from "../actions/questionActions";

import { useForm } from "react-hook-form";
import Ranking from "./Ranking";

function QuestionReviewForm({ question, user, dispatch, loading, hasErrors }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(postReview(data.review, question.id, user));
  };

  const renderQuestions = () => {
    console.log(question.userReviews);
    return question.userReviews?.includes(user);
  };
  if (loading) return <p>Loading ...</p>;
  if (hasErrors) return <p>Unable to display questions.</p>;

  return (
    <section>
    
      {renderQuestions() || user === null ? (
        <div>
          Promedio: <Ranking question={question} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form-review">
          <label htmlFor="review"> Califica esta pregunta: </label>
          <select {...register("review")} id="" required>
            <option value=""> Seleciona: </option>
            <option value="3"> {`\u{1f600}`}</option>
            <option value="2"> {`\u{1f606}`}</option>
            <option value="1">{`\u{1f641}`}</option>

          </select>
          <button type="submit" className=" button-review">
            Guardar calificación
          </button>
        </form>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  question: state.question.question,
  user: state.auth.uid,
});

export default connect(mapStateToProps)(QuestionReviewForm); 