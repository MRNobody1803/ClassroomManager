import React from 'react'
import SideBar from '../SharedComponents/SideBar'
import HeaderAdm from '../SharedComponents/HeaderAdm'
import './admPage.css'
import Users from '../SharedComponents/Users'

export const PageTest = () => {
    const buttonNames = ['DashBoard', 'Users', 'Fields', 'Classroom'];
    return (
      <div>
          <HeaderAdm></HeaderAdm>
          <main className="dashboards">
            <SideBar buttonNames={buttonNames}/>
            <Users/>
          </main>
          
      </div>
    )
}

export default PageTest ;