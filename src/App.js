import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Card from './components/Card'
import { collection, getDocs } from "firebase/firestore"
import db from "./firebase-config"
import Cart from "./components/Cart"
import { auth } from "./firebase-config"
import Product from './modal/product'

function App() {
	const [prod, setProd] = useState([])
	async function onTypeSelected(type = "Electronics") {
		var p = []
		if (type !== 'Cart') {
			var a = []
			var querySnapshot1 = await getDocs(collection(db, type))
			var querySnapshot2 = await getDocs(collection(db, "Users", auth.currentUser.uid, type))
			querySnapshot2.forEach(
				doc => {
					var pr = new Product({ name: doc.data().name, image: doc.data().image })
					a.push(pr)
				}
			)
			console.log("After querySnapshot2 " + a)
			querySnapshot1.forEach(
				doc => {
					let toAdd = true
					for (let i = 0; i < a.length; i++) {
						if (a[i].name === doc.data().name) {
							toAdd = false
							a.splice(i, i + 1)
							var pr = new Product({ name: doc.data().name, image: doc.data().image, price: doc.data().price })
							a.push(pr)
							break
						}
					}
					if (toAdd) {
						var pr = new Product({ image: doc.data().image, name: doc.data().name, price: doc.data().price })
						a.push(pr)
					}
				}
			)
			console.log("After querySnapshot1 " + a)
			a.forEach(
				product => {
					let q = 0
					if (product.quantity != undefined) {
						q = product.quantity
					}
					p.push(<Card image={product.image} name={product.name} price={product.price} quantity={q} type={type} />)
				}
			)

			setProd(p)
		} else {
			setProd(["Cart"])
		}

		return p
	}

	useEffect(
		() => {
			onTypeSelected().then((doc) => {
				setProd(doc)
			})
		}, [])

	return (
		<div className='main-root'>
			<Navbar onTypeSelected={onTypeSelected} />
			<div className='main__products'>
				{
					prod[0] === "Cart" ? <Cart /> : prod
				}
			</div>
		</div>
	)
}

export default App