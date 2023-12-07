
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ToDo from './components/ToDos/ToDo'
import Login from './components/Auth/Login'
import Categories from './components/Categories/Categories'
import AuthProvider from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation/>
          <Routes>
          <Route path='/' element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
            <Route path='/todo' element={<ProtectedRoute ><ToDo /></ProtectedRoute>} />
            <Route path='/login' element={<Login />}/>
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>}/>
            <Route path='*' element={<NotFound/>} />

          </Routes>
        <Footer/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
