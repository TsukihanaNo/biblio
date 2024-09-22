function Part ({part}) {
    return (
        <div className="card col-5 m-1">
            <div className="card-header"><b>{part.part_id}</b></div>
            <div className="card-body">
                <div className="border-bottom"><em>{part.description}</em></div>
                <ul className="list-group list-group-flush list-unstyled">
                    <li>Type: {part.part_type}</li>
                    <li>Disposition: {part.disposition}</li>
                    <li>Inspection Req.: {part.inspection}</li>
                    <li>Mfg.: {part.mfg}</li>
                    <li>Mfg.#: {part.mfg_part}</li>
                    <li>Reference: {part.reference}</li>
                    <li>Replacing: {part.replacing}</li>
                    <li>Disposition Old: {part.disposition_old}</li>
                </ul>
            </div>
        </div>
    )
}

export default Part

