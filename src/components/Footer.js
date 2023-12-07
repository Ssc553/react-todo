import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'

export default function Footer() {
  const { currentUser } = useAuth()

  return (
    <div className='bg-primary'>
    {currentUser &&
      <Logout />
    }
    <footer className='text-center text-white bg-info p-4'>
      <strong>&copy; {new Date().getFullYear()} Scott Cousino, All Rights Reserved.</strong>
    </footer>
    </div>
  )
}