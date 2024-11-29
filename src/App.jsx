import './App.css'
import Home from './Components/Login/Home';
import LoginForm from './Components/Login/LoginForm';
import Footer from './Components/SharedComponents/Footer';
import HeaderMain from './Components/SharedComponents/HeaderMain';


function App() {

  return (
    <div className='page'>
      <div className='homeApp'>
        <HeaderMain/>
      </div>
      <div className="crd">
        <Home/>
      </div>
      <div>
        <Footer/>
      </div>
      
    </div>
    
  );
}

export default App
