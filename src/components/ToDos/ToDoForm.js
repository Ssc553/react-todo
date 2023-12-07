import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Field, Form } from 'formik'
import { todoSchema } from '../../utilities/validationSchema'

export default function ToDoForm(props) {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`http://todoapi.scottcousino.net/api/Categories`).then(response => {
      setCategories(response.data)
    })
  }, [])

  const handleSubmit = (values) => {
    console.log(values)
    if(!props.todo){
 
      const todoToCreate = values

      axios.post(`http://todoapi.scottcousino.net/api/ToDos`, todoToCreate).then(() => {
        props.setShowCreate(false)
        props.getToDo()
      })
    }else {

      const todoToEdit = {
        todoId: props.todo.todoId,
        name: values.name,
        done: props.todo.done,
        categoryId: values.categoryId
      }


      axios.put(`http://todoapi.scottcousino.net/api/ToDos/${props.todo.todoId}`, todoToEdit).then(() => {
        props.setShowEdit(false)
        props.getToDo()
      })
    }
  }

  return (
    <Formik
      initialValues={{
        name: props.todo ? props.todo.name : '',
        done: props.todo ? props.todo.done : false,
        categoryId: props.todo ? props.todo.categoryId : ''
      }}
      validationSchema={todoSchema}
      onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
          <Form id='toDoForm'>
            <div className="form-group m-3">
              <Field name='name' className="form-control" placeholder='New ToDo'/>
              {errors.name && touched.name &&
                <div className="text-danger">{errors.name}</div>
              }
            </div>
          
            
            <div className="form-group m-3">
              <Field as='select' name='categoryId' className='form-control'>
                <option value='' disabled>
                  [--Please Choose--]
                </option>
                {categories.map(cat => 
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.catName}
                  </option>  
                )}
              </Field>
            </div>
            <div className="form-group m-3">
              <button type='submit' className="btn btn-success m-3">
              Feed the Beast!
              </button>
            </div>
          </Form>
        )}
    </Formik>
  )
}