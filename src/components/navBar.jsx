import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Vidly</span>
            <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
            <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
        </nav>
     );
}
 
export default NavBar;