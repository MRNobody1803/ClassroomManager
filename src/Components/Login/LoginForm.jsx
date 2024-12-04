import React, { useState } from 'react';
import './LoginForm.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import HeaderMain from '../SharedComponents/HeaderMain';
import Footer from '../SharedComponents/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Pour la redirection après authentification



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook de navigation pour redirection
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/administrateurs/authenticate', {
            email,
            password
          });
      
          if (response.data.id) {
            // Si la réponse contient un id, cela signifie que l'utilisateur est authentifié
            navigate('/admPage' , { state: response.data });  // Rediriger vers la page Admin
          } else {
            // Si la réponse ne contient pas d'id, c'est que l'authentification a échoué
            setError('Identifiants incorrects');
          }
        } catch (error) {
          console.error('Erreur lors de la connexion:', error);
          setError('Erreur lors de la connexion');
        }
      };
      
      
  
    return (
      <div className="loginpage">
        <div>
          <HeaderMain />
        </div>
        <div className="form">
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              {error && <p className="error">{error}</p>} {/* Afficher l'erreur si présente */}
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Educational Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'email
                />
                <MdOutlineAlternateEmail className='icon' />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Mettre à jour le mot de passe
                />
                <MdOutlinePassword className='icon' />
              </div>
              <div className="select">
                <select name="" id="TypeUser">
                  <option value="adm">Administration</option>
                  <option value="prof">Professeur</option>
                  <option value="rspClass">Responsable des classes</option>
                  <option value="chef">Chef de filière</option>
                </select>
              </div>
              <div className="remember-forgot">
                <label htmlFor=""><input type="checkbox" /> Remember me</label>
                <a href="#">Forgot password</a>
              </div>
              <div className="btn">
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
  
  export default LoginForm;
  