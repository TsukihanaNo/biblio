function Signature ({signature}) {
    return (
        <tr className={signature.signed_date ? "bg-success" : ""}>
            <td>{signature.job_title}</td>
            <td>{signature.name}</td>
            <td>{signature.signed_date}</td>
        </tr>
    )
}

export default Signature