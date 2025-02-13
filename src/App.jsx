import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'
// import Navbar from './components/navbar'
// import MainContainer from './components/MainContainer'
// import LoginForm from './components/LoginForm'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUsername] = useState('')

  useEffect(() => {
    // Fetch the user email and token from local storage
    console.log("in effect checking for user")
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }else{
      setLoggedIn(true)
      setUsername(user.username)
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    // fetch('http://localhost:5000/verify', {
    //   method: 'POST',
    //   headers: {
    //     'jwt-token': user.token,
    //   },
    // })
    //   .then((r) => r.json())
    //   .then((r) => {
    //     setLoggedIn('success' === r.message)
    //     setEmail(user.email || '')
    //   })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  // const [navlink,setNavLink] = useState("mydoc")
  // const [documents,setDocuments] = useState([])
  // // const [token,setToken] = useState()

  // useEffect(()=>{
  //   console.log('in effect',navlink)
  //   console.log(import.meta.env.VITE_API_URL+'/document/'+navlink)
  //   fetch(import.meta.env.VITE_API_URL+'/document/'+navlink).
  //   then(response =>{
  //     if(response.ok){
  //       return response.json();
  //     }
  //   })
  //   .then(data => setDocuments(data));
  // },[navlink]);

  // // console.log('posts',documents);
  // // documents.map((o,i)=>console.log(o.Document.doc_id));

  // return (
  //   <>
  //   <Navbar navlink={navlink} setNavLink={setNavLink}></Navbar>
  //   <MainContainer documents={documents} setNavLink={setNavLink}></MainContainer>
  //   </>
}

export default App
