import React, { useState, useEffect } from "react";
import { Link } from 'react-bootstrap';
// import Navbar from "react-bootstrap";
import { getTokenFromLocalStorage, getPayload } from "../auth/auth";
import axios from 'axios';

const Nav = () => {
    const [userInfo, setUserInfo] = useState([])
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const userIsAuthenticated = () => {
        const payload = getPayload()
        if (!payload) return false
        const now = Math.round(Date.now() / 1000)
        return now < payload.exp
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/profile',
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

    return(
        <div className="container">
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/" className="nav-logo">Home</Link>
                </div>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-active': 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/wines" className="nav-links" onClick={closeMobileMenu}>
                            Wines
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                            About
                        </Link>
                    </li>
                    {!userIsAuthenticated() ?
                    <>
                    <li className="nav-item">
                        <Link to="/register" className="nav-links" onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li>
                    </>
                    :
                    <Link to="/profile">
                        My profile
                    </Link>
                        
                }
                </ul>
            </nav>
        </div>
    )
}

export default Nav;