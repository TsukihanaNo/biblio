import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import MainContainer from './components/MainContainer'

function App() {
  const [navlink,setNavLink] = useState("mydoc")
  return (
    <>
    <Navbar></Navbar>
    <MainContainer></MainContainer>
    </>
  )
}

export default App
