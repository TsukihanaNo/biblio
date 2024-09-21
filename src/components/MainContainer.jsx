import DocumentCard from "./DocumentCard"

function MainContainer({posts}){
    return (
        <section className="container">
            {posts.map((o,i)=><DocumentCard key={o[0]} ecnID={o[0]} title={o[1]}></DocumentCard>)}
        </section>
    )
}

export default MainContainer