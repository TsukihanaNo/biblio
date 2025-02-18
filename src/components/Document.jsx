import { useEffect, useState } from "react";
import Part from "./Part"
import Attachment from "./Attachment"
import Signature from "./Signature";
import Comment from "./Comment";
import Toolbar from "./Toolbar"

function Document ({documents,user}){
    const [parts,setParts] = useState([])
    const [attachments, setAttachments] = useState([])
    const [signatures,setSignatures] = useState([])
    const [comments,setComments] = useState([])
    const [approved,setApproved] = useState(false)
    const [commentCount, setCommentCount] = useState(0)
    // console.log('documents',documents[0].Document)
    const document =documents[0].Document
    useEffect(()=>{
        console.log('in effect, getting part',document.doc_id)
        fetch(import.meta.env.VITE_API_URL+'/part/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setParts(data));
    },[]);

    useEffect(()=>{
        console.log('in effect, getting attachment',document.doc_id)
        fetch(import.meta.env.VITE_API_URL+'/attachment/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setAttachments(data));
    },[]);

    useEffect(()=>{
        console.log('in effect, getting signatures',document.doc_id)
        fetch(import.meta.env.VITE_API_URL+'/signature/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setSignatures(data));
    },[]);

    useEffect(()=>{
        console.log('in effect, getting comments',document.doc_id)
        fetch(import.meta.env.VITE_API_URL+'/comment/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setComments(data));
    },[commentCount]);

    return (
        <>
            <div className="card mb-3">
                <h1 className="card-header text-bg-primary">{document.doc_id} - {user} - {document.signing}</h1>
                <form className="card-body">
                    <h4 className="text-bg-secondary rounded-1 p-1">Header</h4>
                    <div className="row">
                        <div className="col"><b>Author: </b>{document.author}</div>
                        <div className="col"><b>Requestor: </b>{document.requestor}</div>
                        <div className="col"><b>Department: </b>{document.department}</div>
                    </div>
                    <div className="row">
                        <div className="col"><b>Type: </b>{document.doc_type}</div>
                        <div className="col"><b>Reason Code: </b>{document.reason_code}</div>
                        <div className="col"><b>Status: </b>{document.status}</div>
                    </div>
                    <div className="row">
                        <div className="col"><b>Title: </b>{document.doc_title}</div>
                    </div>
                    <h4 className="text-bg-secondary rounded-1 p-1">Reason:</h4>
                    <pre>{document.reason}</pre>
                    <h4 className="text-bg-secondary rounded-1 p-1">Summary:</h4>
                    <pre>{document.summary}</pre>
                    <h4 className="text-bg-secondary rounded-1 p-1">Parts:</h4>
                    <div className="container">
                        <div className="row justify-content-center">
                            {parts.map((o,i)=> <Part key={o.Part.part_id} part={o.Part}></Part>)}
                        </div>
                    </div>
                    <h4 className="text-bg-secondary mt-3">Attachments:</h4>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>File Name</th>
                            <th>File Path</th>
                        </tr>
                        </thead>
                        <tbody>
                        {attachments.map((o,i)=> <Attachment key={o.Attachment.filename} attachment={o.Attachment}></Attachment>)}
                        </tbody>
                    </table>
                    <h4 className="text-bg-secondary">Signatures:</h4>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Name</th>
                            <th>Signed Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {signatures.map((o,i)=> <Signature key={o.Signature.name} signature={o.Signature}></Signature>)}
                        </tbody>
                    </table>
                </form>
            </div>
            <Toolbar signing={document.signing} user={user} doc_id={document.doc_id} setApproved={setApproved} commentCount={commentCount} setCommentCount={setCommentCount}></Toolbar>
            <div className="container">
                <h4 className="text-bg-secondary">Comments:</h4>
                {comments.map((o,i)=> <Comment key={i} comment={o.Comment} author={document.author}></Comment>)}
            </div>
        </>
    )
}


export default Document