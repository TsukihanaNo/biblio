import DocumentCard from "./DocumentCard"

function MainContainer({documents}){
    return (
        <section className="container">
            {documents.map((o,i)=><DocumentCard key={o.Document.doc_id} ecnID={o.Document.doc_id} title={o.Document.doc_title} author={o.Document.author} stage={o.Document.stage} status={o.Document.status} released_on={o.Document.released_on} last_modified={o.Document.last_modified}></DocumentCard>)}
        </section>
    )
}

export default MainContainer