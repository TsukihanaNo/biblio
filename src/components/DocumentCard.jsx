function DocumentCard({document,setNavLink}){
    const link = '/document/view/'+document.doc_id
    return (
        <article className="card mb-3">
            <header>
                <div className="card-header text-bg-primary"><a className="btn text-bg-primary" href={link}>{document.doc_id} : {document.doc_title}</a></div>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-3">Author: {document.author}</div>
                        <div className="col-3">Status: {document.status}</div>
                        <div className="col-3">Released on: {document.released_on}</div>
                        <div className="col-3">Completed On: {document.comp_date}</div>
                    </div>
                    <div className="row">
                        <div className="col-3">Last Modified: {document.last_modified}</div>
                        <div className="col-3">Stage: {document.stage}</div>
                        <div className="col-3">Elapsed Days: {document.elapsed_days}</div>
                        <div className="col-3">Completed Days: {document.completed_days}</div>
                    </div>
                    <div className="row">
                        <div className="col">Waiting On: {document.waiting_on}</div>
                    </div>
                </div>
                </div>
            </header>
        </article>
    )
}

export default DocumentCard