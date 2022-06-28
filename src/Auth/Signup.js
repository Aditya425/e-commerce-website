import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import "./Signup.css"
import db, { auth } from "../firebase-config"
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"

function Signup() {
	const [registerEmail, setRegisterEmail] = useState("")
	const [registerPassword, setRegisterPassword] = useState("")
	const [registerAddress, setRegisterAddress] = useState("")
	const navigate = useNavigate()
	const register = async () => {
		try {
			await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
			const userRef = doc(db, "Users", auth.currentUser.uid)
			const userObj = {
				uid: auth.currentUser.uid,
				email: auth.currentUser.email,
				address: registerAddress
			}

			await setDoc(userRef, userObj)
			navigate("/")
		} catch (error) {
			console.log(error.message)
		}
	}

	const orLogin = () => {
		navigate("/")
	}

	return (
		<div className='main__contain'>
			<h1 className='main__title'>Signup</h1>
			<div className='signup__box'>
				<input 
				type="email" 
				placeholder='Enter your email' 
				onChange={event => {setRegisterEmail(event.target.value)}}
				name="email"
				/>
				<input 
				type='password' 
				placeholder='Enter your password' 
				onChange={event => {setRegisterPassword(event.target.value)}}
				name="password"
				/>
				<input 
				type='textarea' 
				placeholder='Enter your address' 
				onChange={event => {setRegisterAddress(event.target.value)}}
				name="address"
				/>
				<button onClick={register}>Signup</button>
				<h3 onClick={orLogin} className='or__login'>or, Login</h3>
			</div>
		</div>
	)
}

export default Signup