import { useState } from "react"

function RejectionModal({user,doc_id,commentCount,setCommentCount}){

    const addComment = () =>{
        console.log('toolbar link - add comment',import.meta.env.VITE_API_URL+'/comment/'+doc_id+'/add')
        const comment = document.getElementById('comment-text').value
        const commentType = "rejection"
        if (comment !=""){
            fetch(import.meta.env.VITE_API_URL+'/comment/'+doc_id+'/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({user,comment,commentType}),
            })
                .then((r) => r.json())
                .then((r) => {
                    console.log('r',r)
                    console.log(r===200)
                    if (200 === r) {
                        window.alert("document has been rejected")
                        setCommentCount(commentCount+1)
                        document.getElementById('comment-text').value = ""
                        document.querySelector('[data-bs-dismiss="modal"]').click()
                    } else {
                        window.alert('Failed to reject document')
                    }
                })
        }else{
            window.alert("Empty Text Field")
        }
        
    }

    console.log('showing modal')
    return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Reject Document</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea id='comment-text' class="form-control"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" onClick={addComment}>Reject</button>
                </div>
                </div>
            </div>
        </div>

    )
}

export default RejectionModal