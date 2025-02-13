import DocumentCard from "./DocumentCard"
import Document from "./Document"

function MainContainer({documents,setNavLink,user}){
    if(documents.length==1){
        return <section className="container">
            <Document documents={documents} user={user}></Document>
        </section>
    }
    else{
        return (
            <section className="container">
                <h1 className="border-bottom">Showing {documents.length} Documents</h1>
                {documents.map((o,i)=><DocumentCard key={o.Document.doc_id} document={o.Document} setNavLink={setNavLink}></DocumentCard>)}
            </section>
        )
    }
    
}

export default MainContainer