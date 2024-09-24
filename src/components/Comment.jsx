function Comment({comment,author}){
    let color=""
    if(comment.type==='Rejecting to author'){
        color="text-bg-danger"
    }
    if(comment.user_id===author){
        color="text-bg-primary"
    }
    return (
        <div className="card mb-3">
            <div className={"card-header "+color}>{comment.user_id +' ('+comment.comm_date+')'}</div>
            <div className="card-body">{comment.comment}</div>
        </div>
    )
}

export default Comment