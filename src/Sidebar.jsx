import React, { useState, useEffect } from 'react';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { NavLink } from 'react-router-dom';
import firebase from './firebase';
function Sidebar(props){
    const [sideMenu, setsideMenu] = useState(false)
    const [data, setData] = useState([{username:"user"}]);
    useEffect(() => {
        const usercookie = document.cookie.split("usercheck=")
        async function getMultiple() {
            
            const docRef = firebase.firestore().collection("authData");
            const snapshot = await docRef.where("cookiedata","==", usercookie[1]).get();
            if (snapshot.empty) {
                return;
            }
            snapshot.forEach(doc => {

                    return setData(() => {
                        return [doc.data()]
                    })
            });

        }
        if (usercookie[1] !==undefined){
            getMultiple()
        }
    }, [])
    return(<>
    <section className="sidebar" style={{transform:sideMenu? "translateX(-82%)": "translateX(0%)", overflowY:sideMenu? "hidden":"auto", backgroundColor:sideMenu? "#2F485800":"#2F4858"}}>
        <div className="logo">
            <p>My Agenda</p> 
            <p> <i className="fas fa-bars" onClick={()=>{
                if (sideMenu){
                    setsideMenu(false)
                }
                else{
                    setsideMenu(true)
                }
            }
                }></i></p></div>
                <div className="userinfo"><p className="username">{data[0].username}</p>
                <p className="logout"onClick={()=>{
                    document.cookie = "usercheck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    props.screenchanger()}}>Log Out <i className="fas fa-sign-out-alt" >
                </i></p></div>
        <ul>
        <li><NoteAddIcon style={{fontSize:"2.5rem", color:"yellow"}}/><NavLink exact activeClassName="active" to="/raaj">Create</NavLink></li>
        <li><ListAltIcon style={{fontSize:"2.5rem", color:"white"}}/><NavLink exact activeClassName="active" to="/all">All Items</NavLink></li>
        <li><AccessAlarmsIcon style={{fontSize:"2.5rem", color:"red"}}/><NavLink exact activeClassName="active" to="/undone">Undone</NavLink></li>
        <li><AssignmentTurnedInIcon style={{fontSize:"2.5rem", color:"green"}}/><NavLink exact activeClassName="active" to="/completed">Completed</NavLink></li>
        <li><DeleteIcon style={{fontSize:"2.5rem", color:"grey"}}/><NavLink exact activeClassName="active" to="/deleted">Trash</NavLink></li>
       
        </ul>
    </section>
    
    </>)
}

export default Sidebar;
