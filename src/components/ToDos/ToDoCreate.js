import React from 'react'
import ToDoForm from './ToDoForm'

export default function ToDoCreate(props) {
  return (
    <article className="createResource m-2 text-white justify-content-center">
      <ToDoForm
        setShowCreate={props.setShowCreate}
        getToDo={props.getToDo} />
    </article>
  )
}