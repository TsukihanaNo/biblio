import DocumentCard from "./DocumentCard"
import Document from "./Document"

function MainContainer({documents,setNavLink}){
    if(documents.length==1){
        return <section className="container">
            <Document documents={documents}></Document>
        </section>
    }
    else{
        return (
            <section className="container">
                <h1 className="border-bottom">Showing {documents.length} Documents</h1>
                {documents.map((o,i)=><DocumentCard key={o.Document.doc_id} ecnID={o.Document.doc_id} title={o.Document.doc_title} author={o.Document.author} stage={o.Document.stage} status={o.Document.status} released_on={o.Document.released_on} last_modified={o.Document.last_modified} setNavLink={setNavLink}></DocumentCard>)}
            </section>
        )
    }
    
}

export default MainContainer