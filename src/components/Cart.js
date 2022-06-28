import React, { useState, useEffect } from 'react'
import "./Cart.css"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import db from "../firebase-config"
import ClipLoader from "react-spinners/ClipLoader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { auth } from "../firebase-config"

var totalSum = 0;

function Cart() {
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])
	useEffect(() => {
		setLoading(true)
		getProducts().then(
			(prod) => {
				setProducts(prod)
				setLoading(false)
			}
		)
	}, []
	)


	async function getProducts() {
		var categories = ["Electronics", "Grocery", "Appliances", "Sports", "Video Games"]
		var products = []
		var tempSum = 0
		for (var i = 0; i < categories.length; i++) {
			const colRef = collection(db, "Users", auth.currentUser.uid, categories[i])
			const querySnapshot = await getDocs(colRef);
			querySnapshot.forEach((doc) => {
				if (parseInt(doc.data().quantity) > 0) {
					tempSum += parseInt(doc.data().price) * parseInt(doc.data().quantity)
					products.
					push(
					<Divs image={doc.data().image} name={doc.data().name} price={doc.data().price} 
					quantity={doc.data().quantity} type={categories[i]} />)
				}
			});
		}
		totalSum = tempSum
		return products
	}
	
	function Divs({ image, name, price, quantity, type }) {
	
		async function onPlusOrMinus(typeBtn) {
			setLoading(true)
			if (typeBtn === "Plus") {
				
				const colRef = doc(db, "Users", auth.currentUser.uid, type, name)
				const prodObj = {
					image: image,
					name: name,
					price: price,
					quantity: parseInt(quantity) + 1
				}
				await setDoc(colRef, prodObj)
				getProducts().then(prod => {
					setProducts(prod)
					setLoading(false)	
				})
			} else {
				if (quantity > 0) {
					const colRef = doc(db, "Users", auth.currentUser.uid, type, name)
					const prodObj = {
						image: image,
						name: name,
						price: price,
						quantity: parseInt(quantity) - 1
					}
					await setDoc(colRef, prodObj)
					getProducts().then(prod => {
						setProducts(prod)
						setLoading(false)
					})
				}
			}
		}
	
		return (
			<div style={{ color: "white", display: "flex" }}>
				<div className='item'>
					<img src={image} style={{ width: 100, height: 100 }} />
				</div>
				<div className='item'>{name}</div>
				<div className='item' style={{ position: "relative", right: "5" }}>{quantity} x {price}</div>
				<div className='item__plus__minus' style={{ position: "absolute", right: 0 }}>
					<FontAwesomeIcon icon={faPlus} style={{ marginRight: "30px", cursor: "pointer" }} onClick={() => {onPlusOrMinus("Plus")}}/>
					<h3 style={{ marginRight: "30px" }} >{quantity}</h3>
					<FontAwesomeIcon icon={faMinus} style={{ cursor: "pointer" }} onClick={() => {onPlusOrMinus("Minus")}}/>
				</div>
			</div>
		)
	}



	return (
		<div className='main__container'>
			{loading ? <ClipLoader color={"#FFFFFF"} loading={loading} css={{ position: "relative", left: "40%" }} size={150} /> :
				<>
					<div className='main__content'>
						{
							products.length == 0 ? <h1 style={{textAlign: "center"}}>Nothing In Cart!</h1> : products
						}
					</div>
					{
						products.length == 0 ? null : <div className='button'><Link to="/Payment" state={{totalSum: totalSum}}> Pay ₹{totalSum} Now </Link></div>
					}
				</>
			}
		</div>
	)
}

export default Cart