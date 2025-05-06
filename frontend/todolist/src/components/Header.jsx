import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.user_email)
  return (
    <header className="header">

      <img src="logo.png" alt="Logo" className="logo" />
            <Link to="/"><h1 className='logo-txt'>Todo App</h1></Link>
      
      <nav>
        <ul className="nav-links">
          {user.access ? (
            <li>
              <p>{user.user_email}</p>
            </li>
          ):
           <>
            <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          </>
        }
        </ul>
      </nav>
    </header>
  );
}

export default Header;
