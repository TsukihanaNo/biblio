function Document ({documents}){
    console.log('documents',documents[0].Document)
    const document =documents[0].Document
    return (
        <div className="container">
            <div className="card mb-3">
                <h1 className="card-header text-bg-primary">{document.doc_id}</h1>
                <form className="card-body">
                    <h4 className="text-bg-secondary">Header</h4>
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
                    <h4 className="text-bg-secondary">Reason:</h4>
                    <pre>{document.reason}</pre>
                    <h4 className="text-bg-secondary">Summary:</h4>
                    <pre>{document.summary}</pre>
                    <h4 className="text-bg-secondary">Parts:</h4>
                    <div className="container">
                        <div className="row">
                            <div className="card col-3"></div>
                            <div className="card-header">part</div>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush list-unstyled">
                                <li className="list-group-item"></li>
                                <li>Type:</li>
                            </ul>
                        </div>
                    </div>
                    <h4 className="text-bg-secondary mt-3">Attachments:</h4>
                    <h4 className="text-bg-secondary">Signatures:</h4>
                </form>
                <div className="button-container">
                    <form method="post">
                        <button className="btn btn-secondary mb-3" name="button" value="return">Return</button>
                        <button className="btn btn-success mb-3" name="button" value="approve">Approve</button>
                        <button className="btn btn-danger mb-3" name="button" value="reject" >Reject</button>
                        <button className="btn btn-secondary mb-3" name="button" value="add_comment">Add Comment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Document