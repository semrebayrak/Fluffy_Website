import React, { useCallback, useEffect, Profiler, useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Button } from './Button';
import './Navbar.css';
import './pages/Profile';
import fire from '../service/fire';

function Navbar() {


    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/Profile'), [history]);


    const [user, setUser] = useState("");
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);
    const [profile, setProfile] = useState(false);

    const [bgColor, setBgColor] = useState("grey");
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };



    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {

            if (user)
                setUser(user);
            else
                setUser(null);
        })
    }

    useEffect(() => {
        authListener();
    }, [])

    window.addEventListener('resize', showButton);
    return (
        <div>

            <nav className="navbar">
                <div className="navbar-container">

                    <Link to="/" className="navbar-logo">

                        Fluffy <i className="fab fa-typo3">


                        </i>

                    </Link>

                    <div className='menu-icon' onClick={handleClick}>

                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />

                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>

                                Home

                            </Link>

                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>

                                About

                            </Link>

                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>

                                Sign In

                            </Link>

                        </li>

                    </ul>


                    <>

                        {(() => {

                            if (!user) {
                                return (

                                    <>


                                        {button && <Button buttonSize='btn--large' buttonStyle='btn--outline'> Sign In</Button>}
                                    </>
                                )

                            }

                            else {
                                return (


                                    <div className="profilearea">

                                        <button className="icons">
                                            <i class="fas fa-user fa-3x" onClick={handleOnClick}></i>

                                        </button>

                                        <button className="logout" onClick={() => { fire.auth().signOut() }}>
                                            Logout

                                        </button>
                                    </div>
                                )
                            }


                        })()}
s


                    </>




                </div>
            </nav>
        </div>
    )

}

export default Navbar;