import React, { useState } from 'react';
import './Room.css';

const Room = () => {
  const [activeTab, setActiveTab] = useState('Block H'); // État pour l'onglet actif

  const tabs = [
    {
      label: 'Block H',
      content: [
        { room: 'H101', capacity: 30, status: 'Available' },
        { room: 'H102', capacity: 25, status: 'Occupied' },
      ],
    },
    {
      label: 'Block F',
      content: [
        { room: 'F201', capacity: 40, status: 'Available' },
        { room: 'F202', capacity: 35, status: 'Under Maintenance' },
      ],
    },
    {
      label: 'Block K',
      content: [
        { room: 'K301', capacity: 20, status: 'Available' },
        { room: 'K302', capacity: 15, status: 'Occupied' },
      ],
    },
    {
      label: 'Amphi',
      content: [
        { room: 'A1', capacity: 100, status: 'Available' },
        { room: 'A2', capacity: 150, status: 'Occupied' },
      ],
    },
  ];

  const currentTab = tabs.find((tab) => tab.label === activeTab);

  return (
    <div className="room">
      <div className="nav">
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={activeTab === tab.label ? 'active' : ''}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Modify Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTab.content.map((row, index) => (
              <tr key={index}>
                <td>{row.room}</td>
                <td>{row.capacity}</td>
                <td>{row.status}</td>
                <td>
                  <button
                    onClick={() =>
                      alert(`Modify status of ${row.room} in ${activeTab}`)
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Room;
