function Attachment ({attachment}) {
    return (
        <tr>
            <td>{attachment.filename}</td> 
            <td>{attachment.filepath}</td>
        </tr>
    )
}

export default Attachment