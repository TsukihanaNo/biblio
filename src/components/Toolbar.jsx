import { useState } from "react"
import CommentModal from "./CommentModal"
import RejectionModal from "./RejectionModal"

function Toolbar({signing,user,doc_id,setApproved,commentCount,setCommentCount}){
    const approve = () => {
        console.log('toolbar link - approved',import.meta.env.VITE_API_URL+'/document/approve/'+doc_id)
        fetch(import.meta.env.VITE_API_URL+'/document/approve/'+doc_id, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((r) => r.json())
            .then((r) => {
                console.log('r',r)
                console.log(r===200)
                if (200 === r) {
                    window.alert("Approved!")
                    signing='n'
                    setApproved(true)
                    window.location.reload()
                } else {
                    window.alert('Error occured')
                }
            })
    }


    if (signing=='y'){
        return(
            <div className="container mb-3">
                <div>
                    {/* <button className="btn btn-secondary m-1" name="button" value="return">Return</button> */}
                    <button className="btn btn-success m-1" name="button" onClick={approve} value="approve">Approve</button>
                    <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Reject
                    </button>
                    <RejectionModal></RejectionModal>
                    <button type="button" class="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Add Comment
                    </button>
                    <CommentModal></CommentModal>
                </div>
            </div>
        )
        
    }else{
        return (
            <div className="container mb-3">
                <div>
                    {/* <button className="btn btn-secondary m-1" name="button" value="return">Return</button> */}
                    <button type="button" class="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Add Comment
                    </button>
                    <CommentModal user={user} doc_id={doc_id} commentCount={commentCount} setCommentCount={setCommentCount}></CommentModal>


                </div>
            </div>
        )
    }
    
}

export default Toolbar