
import * as Yup from 'yup'

const catSchema = Yup.object().shape({

  catName: Yup.string().max(25, 'Max 25 Characters').required('Required'),
  catDesc: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    todoId: Yup.number().required(),
    name: Yup.string().max(100, 'Max 100 Characters').required('Required'),
    done: Yup.bool().required('Required'),    
    categoryId: Yup.number().required()
})

export { catSchema, todoSchema }