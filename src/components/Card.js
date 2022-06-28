import React, { useState, useEffect } from 'react'
import "./Card.css"
import db from "../firebase-config"
import { setDoc, doc } from 'firebase/firestore'
import { auth } from "../firebase-config"
import ClipLoader from "react-spinners/ClipLoader"

function Card(props) {
	const [loading, setLoading] = useState(false)
	const addToCart = async () => {
		setLoading(true)
		var prodRef = doc(db, "Users", auth.currentUser.uid, props.type, props.name)
		var prodObj = {
			name: props.name,
			image: props.image,
			price: props.price,
			quantity: "1"
		}
		await setDoc(prodRef, prodObj)
		setLoading(false)
	}

	return (
		<div className='main__container__card'>
			<img src={props.image} />
			<div style={{ marginTop: 20 }} />
			<hr />
			<h2>{props.name}</h2>
			<div style={{ marginTop: 10 }} />
			<hr />
			<h2>{props.price}</h2>
			<div style={{ marginTop: 10 }} />
			<hr />
			<div style={{ marginTop: 10 }} />
			{loading ? <ClipLoader color={"#FFFFFF"} loading={loading}  size={50} /> 
			: <button className='btn__add__to__cart' onClick={addToCart}>Add To Cart</button>}
		</div>
	)
}

export default Card