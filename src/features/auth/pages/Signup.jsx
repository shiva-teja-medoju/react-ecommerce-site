import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import authService from '../../../services/authService'

import '../styles/Signup.css'

export const Signup = ({ onClose, onSwitchToLogin }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { name, email, password, confirmPassword } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)

        try {

            const userData = {
                name,
                email,
                password
            }

            const response = await authService.register(userData)

            dispatch(setUser(response))

            toast.success(`Welcome, ${response.name}!`)

            navigate('/')

            onClose()

        } catch (apiError) {

            const message =
                apiError.response?.data?.message ||
                'Failed to sign up'

            console.log(apiError)
            console.log(apiError.response)
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

                    <h2>Signup</h2>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <input
                        type="text"
                        name="name"
                        className="name"
                        placeholder="Enter Your Name"
                        required
                        value={name}
                        onChange={onChange}
                        disabled={loading}
                    />

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
                        minLength="6"
                        value={password}
                        onChange={onChange}
                        disabled={loading}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        className="confirm-password"
                        placeholder="Confirm Your Password"
                        required
                        value={confirmPassword}
                        onChange={onChange}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>

                    <p>
                        Already having an account?

                        <span>
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                            >
                                Login
                            </button>
                        </span>
                    </p>

                </form>
            </div>
        </div>
    )
}