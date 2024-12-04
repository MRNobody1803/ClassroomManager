import './App.css';
import HeaderMain from './Components/SharedComponents/HeaderMain';
import Footer from './Components/SharedComponents/Footer';
import AdmPage from './Components/Pages/AdmPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Components/Pages/MainPage';
import Home from './Components/Login/Home';
import LoginForm from './Components/Login/LoginForm';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admPage/*" element={<AdmPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
    </Router>
  );
}


export default App;
