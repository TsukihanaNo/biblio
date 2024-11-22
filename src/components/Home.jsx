import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import MainContainer from './MainContainer'

const Home = (props) => {
    const { loggedIn, user,setLoggedIn } = props
    const navigate = useNavigate()
    const [navlink,setNavLink] = useState("mydoc")
    const [documents,setDocuments] = useState([])

    if (!loggedIn){
        navigate('/login')
    }

    useEffect(()=>{
        console.log('in effect',navlink)
        console.log(import.meta.env.VITE_API_URL+'/document/'+navlink)
        fetch(import.meta.env.VITE_API_URL+'/document/'+navlink,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            }).
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
        <Navbar navlink={navlink} setNavLink={setNavLink} user={user} setLoggedIn={setLoggedIn}></Navbar>
        <MainContainer documents={documents} setNavLink={setNavLink}></MainContainer>
        </>
    )
}

export default Home