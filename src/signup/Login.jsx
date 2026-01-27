import React, { useState } from 'react'
import './login.css'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { toast } from 'react-toastify'

export const Login = ({ onClose }) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic
        const userData = { name: email.split('@')[0], email };
        dispatch(setUser(userData));
        toast.success("Logged in successfully!");
        onClose();
    }

    return(
        <>
        <div className="cart-overlay">
            <div className='form'>
                   <button className="close-btn" onClick={onClose}>&times;</button>
             <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="text"
                className="name"
                placeholder="Enter your MailId"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                className="password"
                placeholder="Enter your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-btn" type="submit">Login</button>
                
             </form>
            </div>
          </div>
        </>
    )
}