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
