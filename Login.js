import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../firebase'
import './Login.css'
import logo from '../../assets/logo/logo.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    let AuthUser = false
    const history = useHistory();

    const userCheck = async () => {
        const user = firebase.auth().currentUser;
        console.log(AuthUser)
        if (AuthUser) {
            console.log(user)
            history.push('/')
        } 
        else {
            console.log(user)
        }
    }

    const signIn = async (e) => {
        e.preventDefault();
        setError('')
        firebase.auth().signInWithEmailAndPassword(email, password).then(async (userCredential) => {
            const db = firebase.firestore()
            const data = await db.collection("/users/All/users-admin").get()
            data.docs.forEach(doc => {
                if (doc.id == userCredential.uid) {
                    console.log("Found admin user")
                    AuthUser = true
                }
            })
            if (!AuthUser) {
                setError("No admin user found. Sign in with an administrator account")
                firebase.auth().signOut()
            }
            else {
                console.log("Signing in...")
                history.push('/')
            }
        }).catch((error) => {
            console.log(error)
            // setError(error.message)
            if (error.message == "The password is invalid or the user does not have a password.") 
            {
                setError("The password is invalid or nonexistent.")
            }
            else
            {
                setError(error.message)
            }
        })
    }
    useEffect(() => {
        userCheck()
    }, [])
    return (
        <div className = "login-page" >
            <div className = "login">
                <img className = "logo" src={logo} />
                <p className = "login-title">LOGIN</p>
                {error && <p className = "error">{error}</p>}
                <form className = "login-form" onSubmit={(e) => signIn(e)}>
                    <input className = "email" placeholder="email" onChange={(e) => (setEmail(e.target.value))}></input>
                    <input className = "password" placeholder="password" type="password" onChange={(e) => (setPassword(e.target.value))}></input>
                    <button className = "sign-in" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
