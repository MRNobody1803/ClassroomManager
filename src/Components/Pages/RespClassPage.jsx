import React ,{useState} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './RespClass.css'
import SalleMg from '../SharedComponents/SalleMg';
import SideBar from '../SharedComponents/SideBar';
import HeaderAdm from '../SharedComponents/HeaderAdm';
import ReservRequest from '../SharedComponents/ReservRequest';
import AddReservation from '../SharedComponents/AddResevation';
import ProfTimetable from '../SharedComponents/ProfTimetable';
import { useUser } from '../SharedComponents/UserContext';

const RespClassPage = () => {
    const { user } = useUser();
      
    const userName = user?.nom && user?.prenom ? `${user.nom} ${user.prenom}` : 'Utilisateur';

    const buttonNames = [
        { label: 'Timetable', path: '/RespclassPage/timetable' },
        { label: 'Reservation request', path: '/RespclassPage/reservationrequest' },
        { label: 'Room disponibility', path: '/RespclassPage/roomdisponibility' },
        { label: 'ClassRoom Manager', path: '/RespclassPage/classmg' },
    ]
  return (
        <div className="fieldscoordinator">
            <HeaderAdm />
            <main className="dashboards">
                <SideBar buttonNames={buttonNames} profile={userName} />
                <div className="content"> 
                  <Routes>
                    <Route path="timetable" element={<ProfTimetable user={user} />} />
                     <Route path="reservationrequest" element={<ReservRequest user={user} />} />
                    <Route path="roomdisponibility" element={<AddReservation user={user} />} />
                    <Route path="classmg" element={<SalleMg user={user} />} />
                </Routes>  
                </div>
            </main>
        </div>
  )
}

export default RespClassPage ;