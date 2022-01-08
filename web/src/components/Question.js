import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete, setcategorySearch }) => {

  const handleCategorySearch = (e)=>{
    setcategorySearch(question.category)
  }

  return <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2><div dangerouslySetInnerHTML={{__html:question.question}}/></h2>

    {setcategorySearch?
            <p className="categorySearch" onClick={handleCategorySearch}>{question.category}  - <small>{question.type}</small></p>:
            <p>{question.category}  - <small>{question.type}</small></p>}

    {onDelete && (
      <button className="button-delete right" onClick={() => onDelete(question.id)}>ELIMINAR </button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
  </article>
}

