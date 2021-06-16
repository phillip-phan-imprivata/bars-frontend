import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {    
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/playlists">Playlists</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/search">Search</Link>
            </li>
            {
                (localStorage.getItem("bars_token") !== null) ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={() => {
                                localStorage.removeItem("bars_token")
                                props.history.push({ pathname: "/" })
                            }}>Logout</Link>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }
        </ul>
    )
}
