import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({children}) => (
  <section>
    <h1>Welcome, Test</h1>
    <div>
      {children}
    </div>
    <p>welcome to the question app.</p>
    <Link to="/questions" className="button">
      View Questions
    </Link>
  
  </section>
)
export default HomePage
