import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Payment from "./components/Payment"
import App from "./App"
import Signup from "./Auth/Signup"
import Login from "./Auth/Login"
import PaymentSuccessful from "./PaymentSuccessful"

ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/Signup' element={<Signup />} />
            <Route path='/App' element={<App />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/" element={<Login />} />
            <Route path="/PaymentSuccessful" element={<PaymentSuccessful />} />
        </Routes>
    </Router>
    , document.getElementById("root")
)