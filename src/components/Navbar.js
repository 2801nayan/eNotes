import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

    let location = useLocation();

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark`} style={{ background: "#ADDFFF" }}>
            <div className="container-fluid">
                <Link className="text-dark navbar-brand" to="/" ><b className='fw-bold'>eNotes</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link text-dark  ${location.pathname === "/" ? " fw-bold active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-dark ${location.pathname === "/About" ? "fw-bold active" : ""}`} to="/About">About</Link>
                        </li>
                    </ul>
                    { !localStorage.getItem('token') ? <form className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        <Link className='btn btn-light mx-1' to="/login" role="button">Login</Link>
                        <Link className='btn btn-light mx-1' to="/signup" role="button">Signup</Link>
                    </form> : <button className='btn btn-light mx-1' onClick={handleLogout} >Log out</button> }
                </div>
            </div>
        </nav>
    )
}

export default Navbar