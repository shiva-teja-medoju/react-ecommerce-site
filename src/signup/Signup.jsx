import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
 import { toast } from 'react-toastify'; // Assuming react-toastify is used
import { setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import  './Signup.css'

export const Signup = ({ onClose, onSwitchToLogin }) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on new submission

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, the backend would return the user object with an ID
            const userData = { name, email, userId: `user_${Date.now()}` };
            dispatch(setUser(userData));
            toast.success(`Welcome, ${name}!`);
            navigate('/');
            onClose(); // Close modal on success
        } catch (apiError) {
            setError("Failed to sign up. Please try again.");
            toast.error("Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="form-overlay">
            <div className="form">
                <button className="close-btn" onClick={onClose} aria-label="Close">&times;</button>
                <form onSubmit={handleSubmit}>
                    <h2>Signup</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input type="text" 
                    className="name" 
                    placeholder="Enter Your Name" 
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    disabled={loading}
                    />
                    <input type="email" 
                    className="email" 
                    placeholder="Enter Your Email" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    disabled={loading}
                    />
                    <input type="password" 
                    className="password" 
                    placeholder="Enter Your Password" 
                    required
                    minLength="6"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    disabled={loading}
                    />
                    <input type="password" 
                    className="confirm-password" 
                    placeholder="Confirm Your Password" 
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    disabled={loading}
                    />
                    <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                    <p>Already having an account? <span> <button type="button" onClick={onSwitchToLogin}>Login</button></span> </p>
                </form>
            </div>
        </div>
    )
}