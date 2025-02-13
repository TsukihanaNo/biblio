function Toolbar({signing}){
    if (signing=='y'){
        return(
            <div className="container mb-3">
                <form method="post">
                    {/* <button className="btn btn-secondary m-1" name="button" value="return">Return</button> */}
                    <button className="btn btn-success m-1" name="button" value="approve">Approve</button>
                    <button className="btn btn-danger m-1" name="button" value="reject" >Reject</button>
                    <button className="btn btn-secondary m-1" name="button" value="add_comment">Add Comment</button>
                </form>
            </div>
        )
        
    }else{
        return (
            <div className="container mb-3">
                <form method="post">
                    {/* <button className="btn btn-secondary m-1" name="button" value="return">Return</button> */}
                    <button className="btn btn-secondary m-1" name="button" value="add_comment">Add Comment</button>
                </form>
            </div>
        )
    }
    
}

export default Toolbar