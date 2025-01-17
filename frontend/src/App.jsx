// import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import { About } from './pages/about'
import { SignUp, Logout, Login} from './pages/loginSignup'
import { Blogs, CreateBlog } from './pages/blogs'
import { Dashboard } from './pages/dashboard'
import { TokenProvider } from './components/tokenProvider'
import { UpdateDetails } from './pages/updateDetails'


function App() {

  return (
    <>
      <TokenProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/create_blogs" element={<CreateBlog/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/update_details" element={<UpdateDetails/>}/>
          </Routes>
        </Router>
      </TokenProvider>
    </>
  )
}



export default App
