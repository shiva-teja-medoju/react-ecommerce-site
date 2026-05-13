import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import authService from '../../../services/authService'

import '../styles/Login.css'

export const Login = ({ onClose, onSwitchToSignup }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')

        setLoading(true)

        try {

            const userData = {
                email,
                password
            }

            const response = await authService.login(userData)

            dispatch(setUser(response))

            toast.success(`Welcome back, ${response.name}!`)

            navigate('/')

            onClose()

        } catch (apiError) {

            const message =
                apiError.response?.data?.message ||
                'Failed to login'

            setError(message)

            toast.error(message)

        } finally {

            setLoading(false)
        }
    }

    return (

        <div className="form-overlay">

            <div className="form">

                <button
                    className="close-btn"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>

                <form onSubmit={handleSubmit}>

                    <h2>Login</h2>

                    {error && (
                        <div>
                            <p className="error-message">
                            {error}
                            </p>
                        </div>
                        
                    )}

                    <input
                        type="email"
                        name="email"
                        className="email"
                        placeholder="Enter Your Email"
                        required
                        value={email}
                        onChange={onChange}
                        disabled={loading}
                    />

                    <input
                        type="password"
                        name="password"
                        className="password"
                        placeholder="Enter Your Password"
                        required
                        value={password}
                        onChange={onChange}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p>
                        {error && 
                        <div>
                            <h4>Forget password?</h4>
                        </div>
                        }

                        Don't have an account?

                        <span>
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                            >
                                Signup
                            </button>
                        </span>
                    </p>

                </form>

            </div>

        </div>
    )
}