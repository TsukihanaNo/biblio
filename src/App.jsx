import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'
import DocumentView from './components/DocumentView'
// import Navbar from './components/navbar'
// import MainContainer from './components/MainContainer'
// import LoginForm from './components/LoginForm'

function App() {

  // const [user, setUsername] = useState('')
  const getUserName = () => {
    return JSON.parse(localStorage.getItem('user'))?.username
  }
  const [user, setUsername] = useState( getUserName()|| "")
  const [loggedIn, setLoggedIn] = useState(!!user)
  
  console.log(user)
  console.log(import.meta.env.VITE_API_URL)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} />} 
          />
          <Route path="/document/view/:id"
          element={<DocumentView user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
