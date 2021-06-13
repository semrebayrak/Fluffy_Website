import React from 'react';
import '../Login.css';
import { useState, useContext, useEffect } from 'react';
import fire, { facebookAuth } from '../../service/fire';
import { Redirect } from 'react-router';
const Login = () => {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const handleLogin = () => {

        fire.auth().signInWithEmailAndPassword(email, password)


    }

    const handleFacebookClick = async () =>{
      
        const user = await facebookAuth();
        console.log(user);
       
    }
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


    if (user) {
        return <Redirect to="/"></Redirect>
        
    }
    return (
        <section className="login">
            <div className="loginContainer">


                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg"> {emailError}</p>
                <label>Password</label>
                <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg"> {passwordError}</p>
                <div className="btnContainer">

                    <button onClick={handleLogin}>Sign In</button> <p>Forgot Your Password?</p>
                </div>

                <div className="btnContainer">
                   
                    <button className="facebookButton" onClick={() => handleFacebookClick()}>Facebook Sign In</button> 
                </div>

            </div>
        </section>

    )
}

export default Login;
