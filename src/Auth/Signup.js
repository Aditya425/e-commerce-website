import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import "./Signup.css"
import db, { auth } from "../firebase-config"
import { setDoc, doc } from 'firebase/firestore'

function Signup() {
	const [registerEmail, setRegisterEmail] = useState("")
	const [registerPassword, setRegisterPassword] = useState("")
	const [registerAddress, setRegisterAddress] = useState("")

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
			const userRef = doc(db, "Users", auth.currentUser.uid)
			const userObj = {
				uid: auth.currentUser.uid,
				email: auth.currentUser.email,
				address: registerAddress
			}

			await setDoc(userRef, userObj)
			
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div className='main__containe'>
			<div className='login__box'>
				<input 
				type="email" 
				placeholder='Enter your email' 
				onChange={event => {setRegisterEmail(event.target.value)}}
				/>
				<input 
				type='password' 
				placeholder='Enter your password' 
				onChange={event => {setRegisterPassword(event.target.value)}}
				/>
				<input 
				type='textarea' 
				placeholder='Enter your address' 
				onChange={event => {setRegisterAddress(event.target.value)}}
				/>
				<button onClick={register}>Signup</button>
			</div>
		</div>
	)
}

export default Signup