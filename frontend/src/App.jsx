import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Dashboard from '../components/Dashboard'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import UserDetails from '../components/Account'
import Account from '../components/Account'


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
