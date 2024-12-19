import React ,{useState} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SideBar from '../SharedComponents/SideBar';
import HeaderAdm from '../SharedComponents/HeaderAdm';
import DashBoard from '../SharedComponents/DashBoard';
import './admPage.css';
import Users from '../SharedComponents/Users';
import { Fields } from '../SharedComponents/Fields';
import Room from '../SharedComponents/Room';
import { useLocation } from 'react-router-dom';
import { useUser } from '../SharedComponents/UserContext';
import FieldsManagement from '../SharedComponents/FieldsManagement';
import FieldMg from '../SharedComponents/FieldMg';
import GenerateTimetable from '../SharedComponents/GenerateTimetable';
import ProfTimetable from '../SharedComponents/ProfTimetable';
import AddReservation from '../SharedComponents/AddResevation';
import FieldTimeTable from '../SharedComponents/FieldTimeTable';

const FieldCPage = () => {
     const { user } = useUser();
        
    const userName = user?.nom && user?.prenom ? `${user.nom} ${user.prenom}` : 'Utilisateur';

    const buttonNames = [
        { label: 'TimeTable', path: '/fieldcoordinatorPage/timetable' },
        { label: 'Fields Management', path: '/fieldcoordinatorPage/fields' },
        { label: 'TimeTable Management', path: '/fieldcoordinatorPage/timetablemg' },
        { label: 'Add Reservation', path: '/fieldcoordinatorPage/addreservation' },
        { label: 'Field TimeTable', path: '/fieldcoordinatorPage/fieldtimetable' },
    ]

  return (
        <div className="fieldscoordinator">
            <HeaderAdm />
            <main className="dashboards">
                <SideBar buttonNames={buttonNames} profile={userName} />
                <div className="content"> 
                 <Routes>
                    <Route path="timetable" element={<ProfTimetable user={user} />} />
                     <Route path="fields" element={<FieldMg user={user} />} />
                    <Route path="timetablemg" element={<GenerateTimetable user={user} />} />
                    <Route path="addreservation" element={<AddReservation user={user} />} />
                    <Route path="fieldtimetable" element={<FieldTimeTable user={user} />} />
                </Routes> 
                </div>
            </main>
        </div>   
  )
}

export default FieldCPage ;