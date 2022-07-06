import React, { useState, useEffect } from "react";
import { Link } from 'react-bootstrap';
import Navbar from "react-bootstrap";
import { getTokenFromLocalStorage, getPayload } from "../auth/auth";
import axios from 'axios';

const Nav = () => {
    const [userInfo, setUserInfo] = useState([])

    const userIsAuthenticated = () => {
        const payload = getPayload()
        if (!payload) return false
        const now = Math.round(Date.now() / 1000)
        return now < payload.exp
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/user',
                { 
                    headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}`},
                })
                setUserInfo(data)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])
    console.log('userInfo', userInfo)

    retun(
        <div className="container">
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/" className="nav-logo">Home</Link>
                </div>
                
            </nav>
        </div>
    )
}