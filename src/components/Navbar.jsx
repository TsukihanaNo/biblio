function Navbar({setNavLink}){
    return (
        <div className="container-fluid bg-dark">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 bg-dark">
            <div className="col-md-3 mb-2 mb-md-0 text-light"><a>Manager</a></div>
            
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a className="btn nav-link px-2 link-secondary" onClick={()=>setNavLink("mydoc")}>My Documents</a></li>
                <li><a className="btn nav-link px-2" onClick={()=>setNavLink("inprogress")}>In Process</a></li>
                <li><a className="btn nav-link px-2" onClick={()=>setNavLink("completed")}>Completed</a></li>
                <li><a className="btn nav-link px-2" onClick={()=>setNavLink("rejected")}>Rejected</a></li>
                <li><a className="btn nav-link px-2" onClick={()=>setNavLink("canceled")}>Canceled</a></li>  
                </ul>
                <ul className="nav col-md-3 justify-content-end">
                    <li><a href="{{ url_for('auth.logout') }}">Log Out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar