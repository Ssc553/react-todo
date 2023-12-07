import React, { useState } from 'react'
import axios from 'axios'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import ToDoEdit from './ToDoEdit'

export default function SingleToDo(props) {
    const [showEdit, setShowEdit] = useState(false)

    const { currentUser } = useAuth()

    const flipRadio = () => {
        let updatedToDo = {
            todoId: props.todo.todoId,
            name: props.todo.name,
            done: !props.todo.done,
            categoryId: props.todo.categoryId
        }
        axios.put(`http://todoapi.scottcousino.net/api/ToDos/${props.todo.todoId}`, updatedToDo).then(response => {
            console.log(response)
            props.getToDo()
        })
    }

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
            axios.delete(`http://todoapi.scottcousino.net/api/ToDos/${id}`).then(() => {props.getToDo()})
        }
    }

  return (
    <div className='todoResource col-md-5 m-3'>
        <div className='float-left'>
            <input className='radio' type='radio' checked={props.todo.done} onChange={() => flipRadio()} />
        </div>
        <h3 className=' head '>{props.todo.name}</h3>
        <p>{props.todo.category.catName}</p>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div>
            <button id="editLink" onClick={() => setShowEdit(true)} >
              <FaEdit />
            </button>
            <button id="deleteLink" onClick={() => deleteToDo(props.todo.todoId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <ToDoEdit 
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDo={props.getToDo}
              todo={props.todo}/>
            }
          </div>
        }
    </div>
  )
}








































