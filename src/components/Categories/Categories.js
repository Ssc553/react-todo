import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import SingleCategory from './SingleCategory'
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'



export default function Categories() {
  const [categories, setCategories] = useState([])


 const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false)

  const getCategories = () => {
    axios.get(`http://todoapi.scottcousino.net/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className="categories">
      <article className="bg-primary p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                Cancel
              </button>
              <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
            </> :
            <button onClick={() => setShowCreate(true)} className="btn btn-success">
              Create Category
            </button>
          }
        </div>
      }
     
      <Container className='p-2'>
        <table className="table table-dark bg-info my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              
              {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>

            {categories.map(cat => 
              
              <SingleCategory key={cat.categoryId} category={cat} getCategories={getCategories} />
            )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}
