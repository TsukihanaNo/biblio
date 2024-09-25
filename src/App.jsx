import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import MainContainer from './components/MainContainer'
// import LoginForm from './components/LoginForm'

function App() {
  const [navlink,setNavLink] = useState("mydoc")
  const [documents,setDocuments] = useState([])
  // const [token,setToken] = useState()

  useEffect(()=>{
    console.log('in effect',navlink)
    console.log(import.meta.env.VITE_API_URL+'/document/'+navlink)
    fetch(import.meta.env.VITE_API_URL+'/document/'+navlink).
    then(response =>{
      if(response.ok){
        return response.json();
      }
    })
    .then(data => setDocuments(data));
  },[navlink]);

  // console.log('posts',documents);
  // documents.map((o,i)=>console.log(o.Document.doc_id));

  return (
    <>
    <Navbar navlink={navlink} setNavLink={setNavLink}></Navbar>
    <MainContainer documents={documents} setNavLink={setNavLink}></MainContainer>
    </>
  )
}

export default App
