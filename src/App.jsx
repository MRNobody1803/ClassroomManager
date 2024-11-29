import './App.css'
import LoginForm from './Components/Login/LoginForm';
import HeaderMain from './Components/SharedComponents/HeaderMain';


function App() {

  return (
    <div>
      <div className='home'>
        <HeaderMain/>
      </div>
      <div className="form">
        <LoginForm/>
      </div>
    </div>
    
  );
}

export default App
