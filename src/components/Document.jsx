import { useEffect, useState } from "react";
import Part from "./Part"

function Document ({documents}){
    const [parts,setParts] = useState([])
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
    return (
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
                    <h4 className="text-bg-secondary">Signatures:</h4>
                </form>
                <div className="container">
                    <form method="post">
                        <button className="btn btn-secondary m-1" name="button" value="return">Return</button>
                        <button className="btn btn-success m-1" name="button" value="approve">Approve</button>
                        <button className="btn btn-danger m-1" name="button" value="reject" >Reject</button>
                        <button className="btn btn-secondary m-1" name="button" value="add_comment">Add Comment</button>
                    </form>
                </div>
            </div>
    )
}


export default Document