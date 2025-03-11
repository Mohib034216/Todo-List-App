import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">

      <img src="logo.png" alt="Logo" className="logo" />
            <Link to="/"><h1 className='logo-txt'>Todo App</h1></Link>
      
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
