import React, { useEffect, useState } from "react"
import firebase from './firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function All(props) {
    var usercookie = document.cookie.split("usercheck=")
    const [data, setData] = useState([]);
    const [noteOpen, setNoteOpen] = useState(false)
    const [showMenu , setShowMenu]  = useState(false)

    const notify = (text)=>{
        toast.dark(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    useEffect(() => {
        setData([])
        setShowMenu(false)
        setNoteOpen(false)
        async function getMultiple() {
            const notesRef = firebase.firestore().collection(usercookie[1]);
            const snapshot = await notesRef.where('status', '!=', 'delete').get();
            if (snapshot.empty) {
                return;
            }
            snapshot.forEach(doc => {
                setData((prev) => {
                    return [...prev, doc.data()]
                })
            });
        }
        if (usercookie[1] !==undefined){
        getMultiple()
    }
    }, [])


    return (
        <><section className="main ">
            <div className="heading">All Notes and Lists</div>
            <div className="notes-container">
                {data.map((elem, index) => {
                    return (
                        <>
                            <div className="note-wrapper" id={`card${index}`} key={index}>
                                <div className="note-card" key={index}>
                                    <div className="note-title"> <div className="note-title-time"><p className="title">{elem.title}</p><p  className="time">{elem.date}</p></div><p className="btns"> <i className="fas fa-eye" id={`btn${index}`} onClick={() => {
                                        document.getElementById(`card${index}`).classList.toggle("open-note")
                                        if (document.getElementById(`btn${index}`).className == "fas fa-eye") {
                                            document.getElementById(`btn${index}`).classList.remove("fa-eye");
                                            document.getElementById(`btn${index}`).classList.add("fa-eye-slash");
                                            setNoteOpen(true)
                                        }
                                        else {
                                            document.getElementById(`btn${index}`).classList.add("fa-eye");
                                            document.getElementById(`btn${index}`).classList.remove("fa-eye-slash");
                                            setNoteOpen(false)

                                        }

                                    }}></i>

                                        <i className="fas fa-ellipsis-v"
                                         onClick={()=>{
                                            if(showMenu){setShowMenu(false)}
                                            else{setShowMenu(true)}}
                                            }
                                    style={{ fontSize: "1.6rem", marginLeft: "2rem", display: noteOpen ? "inline" : "none" }}></i>
                                    </p>
                                    </div>
                                    <div className="note-settings" style= {{display:showMenu?"block":"none"}}>
                                        <ul>
                                            <li onClick={()=>{
                                                const docRef = firebase.firestore().collection(usercookie[1]).doc(elem.id);
                                                docRef.update({status: "complete"});
                                                notify("Please refresh to see update")
                                                setShowMenu(false)

                                            }}><i className="fas fa-check-square"></i> Completed</li>

                                            <li onClick={()=>{
                                                const docRef = firebase.firestore().collection(usercookie[1]).doc(elem.id);
                                                docRef.update({status: "delete"});
                                                notify("Please refresh to see update")
                                                setShowMenu(false)

                                            }}><i className="fas fa-trash"></i> Delete</li>
                                            <li onClick={()=>{
                                                setShowMenu(false)
                                            }}><i className="fas fa-window-close"></i> Close</li>
                                        </ul>
                                    </div>

                                    <div className="note-items">
                                        {
                                            Object.values(elem).map((element, index) => {

                                                if (element !== elem.title && element !== elem.date && element !== elem.status && element !== elem.id) {
                                                    return (
                                                        <><div key={index} className="item"><i className="fas fa-arrow-circle-right" style={{ fontSize: "1.6rem", color:"#009113" }}></i> {element}</div></>
                                                    )
                                                }
                                            })
                                        }
                                    </div>

                                </div>
                                <ToastContainer/>
                            </div>
                        </>)
                })}
            </div>
        </section>
        </>
    )
}
export default All;