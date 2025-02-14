import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import MainContainer from './MainContainer'
import { useParams } from 'react-router-dom'

const DocumentView = (props) => {
    const params = useParams()
    const {loggedIn, user,setLoggedIn } = props
    const navigate = useNavigate()
    const [navlink,setNavLink] = useState("view/"+params.id)
    const [documents,setDocuments] = useState([])

    if (!loggedIn){
        navigate('/login')
    }

    console.log(user)

    useEffect(()=>{
        console.log('doc view user,',user)
        console.log('doc view in effect',navlink)
        console.log(params.id)
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
        <MainContainer documents={documents} setNavLink={setNavLink} user={user}></MainContainer>
        </>
    )
}

export default DocumentView