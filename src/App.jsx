import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import MainContainer from './components/MainContainer'

function App() {
  const [navlink,setNavLink] = useState("mydoc")
  const [documents,setDocuments] = useState([])

  useEffect(()=>{
    console.log('in effect',navlink)
    fetch('http://localhost:5000/document/'+navlink).
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
    <Navbar setNavLink={setNavLink}></Navbar>
    <MainContainer documents={documents} setNavLink={setNavLink}></MainContainer>
    </>
  )
}

export default App
