function DocumentCard({ecnID, title, author, status, released_on, last_modified, stage,setNavLink}){
    return (
        <article className="card mb-3">
            <header>
                <div className="card-header text-bg-primary"><a className="text-bg-primary" onClick={()=>setNavLink("view/"+ecnID)}>{ecnID} : {title}</a></div>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-3">Author: {author}</div>
                        <div className="col-3">Status: {status}</div>
                        <div className="col-3">Released on: {released_on}</div>
                        <div className="col-3">Completed Days: </div>
                    </div>
                    <div className="row">
                        <div className="col-3">Last Modified: {last_modified}</div>
                        <div className="col-3">Stage: {stage}</div>
                        <div className="col-6">Waiting On: </div>
                    </div>
                </div>
                </div>
            </header>
        </article>
    )
}

export default DocumentCard