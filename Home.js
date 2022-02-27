import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Home.css'
import firebase from '../../firebase'

const Home = () => {
    const [admins, setAdmins] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const history = useHistory();

    const fetchData = async () => {
        const db = firebase.firestore()
        const data = await db.collection('users/Minerva/users').get()
        setAdmins(data.docs.map(doc => doc.data()))
    }

    const getUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserInfo(user)
                console.log(userInfo)
            } 
            else {
                console.log('Signed out')
                history.push('/login')
            }
          });   
    }
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
          }).catch((error) => {
            console.log(error)
          });
    }
    useEffect(() => {
        getUser()
        fetchData()
    }, [])
    return (
        <div className="home">
           <ul>
                {admins.map(admin =>
                    <li key={admin.uid}>{admin.username}</li>
                )}
            </ul>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default Home