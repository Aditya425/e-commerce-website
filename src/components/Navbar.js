import React from 'react'
import "./Navbar.css"
import { signOut } from 'firebase/auth'
import { auth } from "../firebase-config"
import { useNavigate } from 'react-router-dom'
import logo from "C:/Users/Aditya/Documents/reactjs-practise/e-commerce-website/src/images/logo.png"

function Navbar({ onTypeSelected }) {

    const navigate = useNavigate()
    const SignOut = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        <div className='main-container'>
            <nav className='main-navbar'>
                <div className='main-navbar-logo-text'>
                    <img src={logo} alt='Company logo' className='main-container-logo' />
                    <h3>Software Labs Shopping</h3>
                </div>
                <div className='main-navbar-item'>
                    <div onClick={() => onTypeSelected("Electronics")}>Electronics</div>
                </div>
                <div className='main-navbar-item'>
                    <div onClick={() => onTypeSelected("Grocery")}>Grocery</div>

                </div>
                <div className='main-navbar-item'>
                    <div onClick={() => onTypeSelected("Appliances")}>Appliances</div>

                </div>
                <div className='main-navbar-item'>
                    <div onClick={() => onTypeSelected("Sports")}>Sports</div>

                </div>
                <div className='main-navbar-item'>
                    <div onClick={() => onTypeSelected("Video Games")}>Video Games</div>

                </div>
                <div className='main-navbar-item'>
                    <div onClick={() => onTypeSelected("Cart")}>Cart</div>
                </div>
                <div className='main-navbar-item'>
                    <div onClick={SignOut}>Signout</div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar