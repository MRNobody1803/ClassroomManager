import React from 'react'
import './LoginForm.css'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";

const LoginForm = () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="email" placeholder="Educational Email" required />
                <MdOutlineAlternateEmail className='icon' />
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' required  />
                <MdOutlinePassword className='icon'/>
            </div>
            <div className="select">
                <select name="" id="TypeUser">
                    <option value="adm">Administration</option>
                    <option value="prof">Professeur</option>
                    <option value="rspClass">Responsable des classes</option>
                    <option value="chef">Chef de filliére</option>
                </select>
                {/* <GoTriangleDown className='icon' /> */}
            </div>
            <div className="remember-forgot">
                <label htmlFor=""><input type="checkbox" /> Remember me</label>
                <a href="#">Forgot password</a>
            </div>
            <div className="btn">
                <button type="submit">Submit</button>
                <button type="submit">Cancel</button>
            </div>
            
            
        </form>
    </div>
  )
}

export default LoginForm 