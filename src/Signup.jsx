import React, { useState } from "react"
import firebase from './firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var validator = require("email-validator");

function Signup(props){
    const authData = firebase.firestore().collection('authData');
    const [isSignup,setSign] = useState(true);
    const style1 = {borderBottom : "2px solid #f7a61c",color:"#f7a61c"};
    const style2 = {borderBottom : "none"};

    async function SignUp(e){
        e.preventDefault()
        let username = document.getElementById('username').value
        let semail = document.getElementById('semail').value
        let spassword = document.getElementById('spassword').value
        let scpassword = document.getElementById('scpassword').value
        let isvalidEmail = validator.validate(semail)

        if(!isvalidEmail){
            toast.dark("Enter valid email",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true
            })

        }
        else if (spassword===scpassword && username != "" && semail != "" && spassword != "" ){
            const snapshot =  await authData.where('email', '==', semail).get();
            if(snapshot.empty){
                let cookiedata =`${semail}${spassword}`
                const userData = {
                    username:username,
                    email : semail,
                    password : spassword,
                    cookiedata:cookiedata
                }
                const timestamp = new Date().toISOString()
                authData.doc(timestamp).set(userData)
                toast.success("Sign Up Successful",{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true
                })
                setSign(false)
            }
            else{
                toast.dark("Email already taken!! Please choose a different email",{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true
                })
            }   
        }
        else if(spassword!=scpassword){
            toast.dark("Passwords do not match",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true
            })

        }
        else{
            toast.dark("Please fill all entries",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true
            })}
    }

    async function LogIn(e){
        e.preventDefault()
        let lemail = document.getElementById('lemail').value
        let lpassword = document.getElementById('lpassword').value
        const snapshot =  await authData.where('email', '==', lemail).where('password', '==', lpassword).get();

        if(snapshot.empty){
            toast.error("Invalid Email or Password",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true
            })
        }
        else{
            toast.success("Login successful",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true
            })
            
            let now = new Date();
            now.setTime(now.getTime() + 1 * 3600 * 1000);
            document.cookie=`usercheck=${lemail}${lpassword}; expires= ${now.toUTCString()};`
            props.screenchanger()
               
        }
        
    }
    return(
        <>
        <div className="signup_wrapper">
            
            {isSignup?<div className="signup" >
            <div className="sign_toggle">
            <div className="sign_div" style={isSignup?style1:style2} onClick={()=>{setSign(true)}}>Sign Up</div>
            <div className="log_div"  style={isSignup?style2:style1} onClick={()=>{setSign(false)}}>Log In</div></div>
                <form action="" className="signup_form">
                    <input name="username" id="username" type="text" placeholder="Username*" required/>
                    <input name="email" id="semail" type="email" placeholder="Email*" required/>
                    <input name="password" id="spassword" type="password" placeholder="Password*" required/>
                    <input name="cpassword" id="scpassword" type="password" placeholder="Confirm Password*" required/>
                    <p>* Enter any email as there is no OTP verification</p>

                    <button onClick = {SignUp}>Sign Up</button>
                </form>

                </div>:
                <div className="signup log" >
                <div className="sign_toggle">
                <div className="sign_div" style={isSignup?style1:style2} onClick={()=>{setSign(true)}}>Sign Up</div>
                <div className="log_div" style={isSignup?style2:style1} onClick={()=>{setSign(false)}}>Log In</div></div>
                <form action="" className="signup_form log">
                    <input name="email" id="lemail" type="email" placeholder="Email*" required/>
                    <input name="password" id="lpassword" type="password" placeholder="Password*" required/>
                    <button onClick={LogIn}>Log In</button>
                </form>

                </div>}
                <ToastContainer/>
            </div>
        </>
    )
}
export default Signup;