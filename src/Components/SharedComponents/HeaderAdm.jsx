import React from 'react';
import './HeaderAdm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopware } from '@fortawesome/free-brands-svg-icons';

const HeaderAdm = () => {
  return (
    <header className="navigationAdm">
      <nav>
        <h1><FontAwesomeIcon icon={faShopware} /> UnivClass</h1>
        <div className="navbarrAdm">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/login">Log Out</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderAdm ;
