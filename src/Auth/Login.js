import React, { useState } from 'react'
import "./Login.css"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase-config"
import { useNavigate } from "react-router-dom"

function Login() {
	const navigate = useNavigate()
	const [LoginEmail, setLoginEmail] = useState("")
	const [LoginPassword, setLoginPassword] = useState("")
	const login = async () => {
		const user = await signInWithEmailAndPassword(auth, LoginEmail, LoginPassword)
		navigate("/App")
	}

	const orSignup = () => {
		navigate("/Signup")
	}

	return (
		<div className='main__containe'>
			<h1 className='main__title'>Login</h1>
			<div className='login__box'>
				<input
					type="email"
					placeholder='Enter your email'
					onChange={event => { setLoginEmail(event.target.value) }}
					name="email"
				/>
				<input
					type='password'
					placeholder='Enter your password'
					onChange={event => { setLoginPassword(event.target.value) }}
					name="password"
				/>
				<button onClick={login}>Login</button>
				<h3 onClick={orSignup} className='or__login'>or, Signup</h3>
			</div>
		</div>
	)
}

export default Login