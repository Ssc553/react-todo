
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilterCat(props) {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`http://todoapi.scottcousino.net/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }, [])

  return (
    <div className="text-center mt-3">
      <button onClick={() => props.setFilter(0)} className="btn btn-outline-info bg-muted m-1">
        All
      </button>
      {/* Below we map all categories to a button that will filter resources on that category */}
      {categories.map(cat => 
            <button key={cat.categoryId} className="btn btn-outline-success m-1 bg-muted"  onClick={() => props.setFilter(Number(cat.categoryId))}>
                {cat.catName}
            </button>
        )}
    </div>
  )
}