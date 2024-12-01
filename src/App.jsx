import './App.css'
import HeaderMain from './Components/SharedComponents/HeaderMain'
import Footer from './Components/SharedComponents/Footer'
import AdmPage from './Components/Pages/AdmPage';
import MainPage from './Components/Pages/MainPage'
import Users from './Components/SharedComponents/Users'
import PageTest from './Components/Pages/PageTest';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
 
  return (  
    <Router>
      <PageTest/>
    </Router>
  );
}

export default App;