import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Dashboard from '../components/Dashboard'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Account from '../components/Account'
import Admin from '../components/Admin'
import AdminSignin from '../components/AdminSignin'
import EditUsers from '../components/EditUsers'
import EditBooks from '../components/EditBooks'
import EditGenres from '../components/EditGenres'
import BuyBook from '../components/BuyBook'


function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/adminsignin" element={<AdminSignin/>}/>
          <Route path="/editusers" element={<EditUsers/>}/>
          <Route path="/editbooks" element={<EditBooks/>}/>
          <Route path="/editgenres" element={<EditGenres/>}/>
          <Route path="/buybook/:bookId" element={<BuyBook/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
  
}

export default App
