import './App.css';
import HeaderMain from './Components/SharedComponents/HeaderMain';
import Footer from './Components/SharedComponents/Footer';
import AdmPage from './Components/Pages/AdmPage';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from './Components/Pages/MainPage';
import Home from './Components/Login/Home';
import LoginForm from './Components/Login/LoginForm';

function App() {
  return (
   
  <Router>
    <MainPage/>
    <AdmPage/>
  </Router>
      
    
  );
}

export default App;
