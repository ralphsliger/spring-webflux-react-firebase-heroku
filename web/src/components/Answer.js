import React from 'react'

export const Answer = ({ answer, userId, onDelete }) => (
  <aside className="answer">
    <p>{answer.answer}</p>
    {answer.userId === userId && 
    <button className="button-delete right"
        onClick={()=>
          {onDelete(answer.id)}
      }
      >Eliminar</button>}
  </aside>
)
