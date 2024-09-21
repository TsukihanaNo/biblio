function Navbar(){
    return (
        <div className="container-fluid bg-dark">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 bg-dark">
            <div className="col-md-3 mb-2 mb-md-0 text-light"><a>Manager</a></div>
            
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a class="nav-link px-2 link-secondary" href="{{ url_for('document.index') }}">My Documents</a></li>
                <li><a class="nav-link px-2" href="{{ url_for('document.showQueue') }}">My Queue</a></li>
                <li><a class="nav-link px-2" href="{{ url_for('document.showInprogress') }}">In Process</a></li>
                <li><a class="nav-link px-2" href="{{ url_for('document.showCompleted') }}">Completed</a></li>
                <li><a class="nav-link px-2" href="{{ url_for('document.showRejected') }}">Rejected</a></li>
                <li><a class="nav-link px-2" href="{{ url_for('document.showCanceled') }}">Canceled</a></li>  
                </ul>
                <ul class="nav col-md-3 justify-content-end">
                    <li><a href="{{ url_for('auth.logout') }}">Log Out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar