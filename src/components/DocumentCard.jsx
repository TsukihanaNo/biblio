function DocumentCard({ecnID, title}){
    return (
        <article className="card mb-3">
            <header>
                <div className="card-header text-bg-primary"><a className="text-bg-primary" href="{{ url_for('document.update', id=post['doc_id']) }}">{ecnID} : {title}</a></div>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-3">Author: </div>
                        <div className="col-3">Status: </div>
                        <div className="col-3">Released on: </div>
                        <div className="col-3">Completed Days:  </div>
                    </div>
                    <div className="row">
                        <div className="col-3">Last Modified: </div>
                        <div className="col-3">Stage: </div>
                        <div className="col-6">Waiting On: </div>
                    </div>
                </div>
                </div>
            </header>
        </article>
    )
}

export default DocumentCard