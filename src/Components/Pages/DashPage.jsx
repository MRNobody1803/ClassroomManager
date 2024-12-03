import React from 'react'
import SideBar from '../SharedComponents/SideBar'
import HeaderAdm from '../SharedComponents/HeaderAdm'
import DashBoard from '../SharedComponents/DashBoard'

const DashPage = () => {
    const buttonNames = ['DashBoard', 'Users', 'Fields', 'Classroom'];
  return (
    <div>
        <HeaderAdm></HeaderAdm>
        <main className="dashboards">
          <SideBar buttonNames={buttonNames}/>
          <DashBoard/>
        </main>
    </div>
  )
}

export default DashPage ;
