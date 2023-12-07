import React, { useState, useEffect } from 'react'
import './ToDo.css'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import SingleToDo from './SingleToDo'
import FilterCat from './FilterCat'
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function ToDo() {
  const [todo, setToDo] = useState([])

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false)

  const [filter, setFilter] = useState(0)

  const getToDo = () => {
    axios.get(`http://todoapi.scottcousino.net/api/ToDos`).then(response => {
      console.log(response)
      setToDo(response.data)
    })
  }

  useEffect(() => {
    getToDo()
  }, [])

  return (
    <section className="todo">
      <article className="todoNav p-5">
        <h1 className="text-center textNav">Scotts ReactJS ToDo Dashboard</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New ToDo' : 'Close Form'}
          </button>
          <div className="createContainer">
             {showCreate &&

              <ToDoCreate setShowCreate={setShowCreate} getToDo={getToDo} />
             }
          </div>
        </div>
      }
 
      <FilterCat setFilter={setFilter} />
      <Container>
        <article className="todoGallery row justify-content-center">
     
          {filter === 0 ? todo.map(r => 
         
            <SingleToDo key={r.todoId} todo={r} getToDo={getToDo} />  
          ) :
          todo.filter(r => r.categoryId === filter).map(r =>
            <SingleToDo key={r.todoId} todo={r} getToDo={getToDo} />
          )}
          
          {filter !== 0 && todo.filter(r => r.categoryId === filter).length === 0 &&
            <h2 className="alert alert-warning text-dark">
              There are no results for this category.
            </h2>
          }

        </article>
      </Container>
    </section>
  )
}










































