import React from 'react';
import './HeaderMain.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopware } from '@fortawesome/free-brands-svg-icons';

const HeaderMain = () => {
  return (
    <header className="navigation">
      <nav>
        <h1><FontAwesomeIcon icon={faShopware} /> UnivClass</h1>
        <div className="navbarr">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Log in</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderMain;
