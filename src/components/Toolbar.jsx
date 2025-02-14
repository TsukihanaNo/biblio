function Toolbar({signing,user,doc_id,setApproved}){

    const approve = () => {
        console.log('toolbar link',import.meta.env.VITE_API_URL+'/document/approve/'+doc_id)
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
                    <button className="btn btn-danger m-1" name="button" value="reject" >Reject</button>
                    <button className="btn btn-secondary m-1" name="button" value="add_comment">Add Comment</button>
                </div>
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