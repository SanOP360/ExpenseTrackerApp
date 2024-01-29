import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../store/AuthContext'
import './header.css'


const Header=()=>{
    const ctx= useContext(AuthContext);
    const navigate=useNavigate();
    const logoutHandler=()=>{
        navigate('/');
        ctx.logout();

    }

    return (
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/Home">Home</Link>
          <Link to="/Profile">Profile</Link>
        </div>
        <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
    );
    
}

export default Header