import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'


const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const [search, setSearch] = useState('');
    const [categorySearch, setcategorySearch] = useState('');

    var filterByCategory = questions.filter(question => question.category.toUpperCase().includes(categorySearch.toUpperCase()));

    var searchFiltered = filterByCategory.filter(question => question.question.toUpperCase().includes(search.toUpperCase()));

    const filter = searchFiltered[0]?.id;

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }

    const renderQuestions = () => {
        if (loading) return <div className="loading">Loading questions...</div>
        if (hasErrors) return <p>Something is wrong, Unable to display questions.</p>

        return searchFiltered.map(question => <Question setcategorySearch={setcategorySearch} key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h1>Questions</h1>
            <form className="form-search">
                <input type="text" onChange={handleSearch} placeholder="Filter search.."/>
                <Link to={`/question/${filter}`}><input style={{display: 'none'}} type="submit" value="search" /></Link>
            </form>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)