import './App.css';
import HeaderMain from './Components/SharedComponents/HeaderMain';
import Footer from './Components/SharedComponents/Footer';
import AdmPage from './Components/Pages/AdmPage';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import MainPage from './Components/Pages/MainPage';
import Home from './Components/Login/Home';
import LoginForm from './Components/Login/LoginForm';
import { UserProvider } from './Components/SharedComponents/UserContext';
import ProfPage from './Components/Pages/ProfPage';
import FieldCPage from './Components/Pages/FieldCPage';
import FieldsManagement from './Components/SharedComponents/FieldsManagement';
import RespClassPage from './Components/Pages/RespClassPage';
import HeaderAdm from './Components/SharedComponents/HeaderAdm';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admPage/*" element={<AdmPage />} />
          <Route path="/profPage/*" element={<ProfPage />} />
          <Route path="/fieldcoordinatorPage/*" element={<FieldCPage />} />
          <Route path="/RespclassPage/*" element={<RespClassPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


 