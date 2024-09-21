function DocumentCard(){
    return (
        <article class="card mb-3">
            <header>
                <div class="card-header text-bg-primary"><a class="text-bg-primary" href="{{ url_for('document.update', id=post['doc_id']) }}">ECNID : ECN Title</a></div>
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                        <div class="col-3">Author: </div>
                        <div class="col-3">Status: </div>
                        <div class="col-3">Released on: </div>
                        <div class="col-3">Completed Days:  </div>
                    </div>
                    <div class="row">
                        <div class="col-3">Last Modified: </div>
                        <div class="col-3">Stage: </div>
                        <div class="col-6">Waiting On: </div>
                    </div>
                </div>
                </div>
            </header>
        </article>
    )
}

export default DocumentCard