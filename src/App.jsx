import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import MainContainer from './components/MainContainer'

function App() {
  const [navlink,setNavLink] = useState("mydoc")
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    console.log('in effect')
    fetch('http://localhost:5000/posts').
    then(response =>{
      if(response.ok){
        return response.json();
      }
    })
    .then(data => setPosts(data.posts));
  },[]);

  // console.log('posts',posts);
  // posts.map((o,i)=>console.log(o));

  return (
    <>
    <Navbar></Navbar>
    <MainContainer posts={posts}></MainContainer>
    </>
  )
}

export default App
