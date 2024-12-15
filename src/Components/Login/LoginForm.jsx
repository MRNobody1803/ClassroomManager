import React, { useState } from 'react';
import './LoginForm.css';
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md";
import HeaderMain from '../SharedComponents/HeaderMain';
import Footer from '../SharedComponents/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../SharedComponents/UserContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeUser, setTypeUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  
    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (typeUser === "ADMINISTRATOR") {
                const response = await axios.post('http://localhost:8080/PROJET_JEE_REST_war_exploded/api/administrateurs/authenticate', { email, password });
                if (response.data.id) {
                    setUser(response.data);
                    navigate('/admPage/Dashboard');
                } else {
                    setError('Adm : Identifiants incorrects');
                }
            } else {
                const response = await axios.post('http://localhost:8080/PROJET_JEE_REST_war_exploded/api/utilisateurs/authenticate', { email, password });
                if (response.data.id) {
                    setUser(response.data);
                    const { typeUser } = response.data;
                    if (typeUser === "PROFESSOR") {
                        navigate('/profPage/timetable');
                    } else if (typeUser === "FIELD_RESPONSABLE") {
                        navigate('/fieldcoordinatorPage/timetable');
                    } else {
                        navigate('/RespclassPage/timetable');
                    }
                } else {
                    setError('Identifiants incorrects');
                }
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError(error.response?.data?.message || 'Erreur lors de la connexion');
        }
    };

    return (
        <div className="loginpage">
            <HeaderMain />
            <div className="form">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Educational Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdOutlineAlternateEmail className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <MdOutlinePassword className='icon' />
                        </div>
                        <div className="select">
                            <select value={typeUser} onChange={(e) => setTypeUser(e.target.value)} required>
                                <option value="">Select your Profession</option>
                                <option value="ADMINISTRATOR">Administrator</option>
                                <option value="PROFESSOR">Professor</option>
                                <option value="FIELD_RESPONSABLE">Field Coordinator</option>
                                <option value="RESPCLASS">Class Coordinator</option>
                            </select>
                        </div>
                        <div className="remember-forgot">
                            <a href="#">Forgot password</a>
                        </div>
                        <div className="btn">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => { setEmail(''); setPassword(''); setTypeUser(''); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginForm;
