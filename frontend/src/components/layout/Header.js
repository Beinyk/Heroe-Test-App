import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-3 py-0">
                <div className="container">
                    <a href="/" className="navbar-brand">The world of marvel</a>
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <i className="fas fa-home">Home</i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/heroe/add" className="nav-link">
                                    <i className="fas fa-plus">Add</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Header