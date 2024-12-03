import Home from '../../Components/Login/Home';
import LoginForm from '../../Components/Login/LoginForm';
import Footer from '../../Components/SharedComponents/Footer';
import HeaderMain from '../../Components/SharedComponents/HeaderMain';
import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import './MainPage.css'
import AdmPage from './AdmPage';


function MainPage() {

  return (
    <div >
       <Routes className='page'>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
       </Routes> 
    </div>
    
  );
}

export default MainPage
{/* <div className="crd">
        <Home/>
      </div>
       */}