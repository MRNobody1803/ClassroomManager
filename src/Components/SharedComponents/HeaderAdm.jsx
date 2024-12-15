import React from 'react';
import './HeaderAdm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopware } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import { useUser } from '../SharedComponents/UserContext';

const HeaderAdm = () => {

  const handleLogout = () => {
    setUser(null);  
    navigate('/login', { replace: true }); 
  };

  return (
    <header className="navigationAdm">
      <nav>
        <h1><FontAwesomeIcon icon={faShopware} /> UnivClass</h1>
        <div className="navbarrAdm">
          <ul>
            <li><Link onClick={handleLogout} to="/home">Home</Link></li>
            <li><Link onClick={handleLogout} to="/home">Log Out</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderAdm;
