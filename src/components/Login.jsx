import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    if (props.loggedIn){
        navigate('/')
    }

    const checkAccountExists = (callback) => {
        // fetch('http://localhost:5000/check-account', {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username }),
        // })
        // .then((r) => r.json())
        // .then((r) => {
        //     callback(r?.userExists)
        // })
        callback(true)
    }
      // Log in a user using email and password
    const logIn = () => {
        fetch(import.meta.env.VITE_API_URL+'/auth', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((r) => r.json())
            .then((r) => {
                // console.log(r.message)
                if ('success' === r.message) {
                    localStorage.setItem('user', JSON.stringify({ username, token: r.token }))
                    props.setLoggedIn(true)
                    props.setUsername(username)
                    navigate('/')
                } else {
                    window.alert('Wrong email or password')
                }
            })
    }

    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError('')
        setPasswordError('')
    
        // Check if the user has entered both fields correctly
        // if ('' === email) {
        // setEmailError('Please enter your email')
        // return
        // }
    
        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        // setEmailError('Please enter a valid email')
        // return
        // }
    
        if ('' === password) {
        setPasswordError('Please enter a password')
        return
        }
    
        // if (password.length < 7) {
        // setPasswordError('The password must be 8 characters or longer')
        // return
        // }
    
        // Authentication calls will be made here...
        checkAccountExists((accountExists) => {
            // If yes, log in
            if (accountExists) logIn()
            // Else, ask user if they want to create a new account and if yes, then log in
            else if (
                window.confirm(
                'An account does not exist with this email address: ' +
                email +
                '. Do you want to create a new account?',
                )
            ) {
                logIn()
            }
        })
    }

    return (
        <div className={'mainContainer'}>
        <div className={'titleContainer'}>
            <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input
            value={username}
            placeholder="Enter your username here"
            onChange={(ev) => setUsername(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
        </div>
    )
}

export default Login