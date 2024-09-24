import { useEffect, useState } from "react";
import Part from "./Part"
import Attachment from "./Attachment"
import Signature from "./Signature";
import Comment from "./Comment";

function Document ({documents}){
    const [parts,setParts] = useState([])
    const [attachments, setAttachments] = useState([])
    const [signatures,setSignatures] = useState([])
    const [comments,setComments] = useState([])
    // console.log('documents',documents[0].Document)
    const document =documents[0].Document
    useEffect(()=>{
        console.log('in effect, getting part',document.doc_id)
        fetch('http://localhost:5000/part/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setParts(data));
    },[document.doc_id]);

    useEffect(()=>{
        console.log('in effect, getting attachment',document.doc_id)
        fetch('http://localhost:5000/attachment/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setAttachments(data));
    },[document.doc_id]);

    useEffect(()=>{
        console.log('in effect, getting signatures',document.doc_id)
        fetch('http://localhost:5000/signature/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setSignatures(data));
    },[document.doc_id]);

    useEffect(()=>{
        console.log('in effect, getting comments',document.doc_id)
        fetch('http://localhost:5000/comment/'+document.doc_id+'/get').
        then(response =>{
        if(response.ok){
            return response.json();
        }
        })
        .then(data => setComments(data));
    },[document.doc_id]);

    return (
        <>
            <div className="card mb-3">
                <h1 className="card-header text-bg-primary">{document.doc_id}</h1>
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
                    <table class="table">
                        <tr>
                            <th>File Name</th>
                            <th>File Path</th>
                        </tr>
                        {attachments.map((o,i)=> <Attachment key={o.Attachment.filename} attachment={o.Attachment}></Attachment>)}
                    </table>
                    <h4 className="text-bg-secondary">Signatures:</h4>
                    <table class="table">
                        <tr>
                            <th>Job Title</th>
                            <th>Name</th>
                            <th>Signed Date</th>
                        </tr>
                        {signatures.map((o,i)=> <Signature key={o.Signature.name} signature={o.Signature}></Signature>)}
                    </table>
                </form>
            </div>
            <div className="container mb-3">
                    <form method="post">
                        {/* <button className="btn btn-secondary m-1" name="button" value="return">Return</button> */}
                        <button className="btn btn-success m-1" name="button" value="approve">Approve</button>
                        <button className="btn btn-danger m-1" name="button" value="reject" >Reject</button>
                        <button className="btn btn-secondary m-1" name="button" value="add_comment">Add Comment</button>
                    </form>
                </div>
            <div className="container">
                <h4 className="text-bg-secondary">Comments:</h4>
                {comments.map((o,i)=> <Comment key={i} comment={o.Comment} author={document.author}></Comment>)}
            </div>
        </>
    )
}


export default Document