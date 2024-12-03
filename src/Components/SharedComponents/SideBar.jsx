import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import du composant Link
import './SideBar.css';
import { assets } from '../../assets/assets';
import svg from '../../assets/profile.svg';

const SideBar = ({ buttonNames = [] }) => {
  const [extended, setExtended] = useState(true);

  return (
    <div className="sidebar">
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="menu icon" 
        />
        {extended && (
          <div className="actions">
            {buttonNames.map((button, index) => (
              <Link 
                key={index} 
                to={button.path} 
                className="sidebar-link"
              >
                {button.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item">
          <img src={svg} alt="profile" />
          {extended && <p> ABDESSAMAD EL HACHAMI </p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
