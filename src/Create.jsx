import React, {  useState } from 'react';
import List from './List';
import firebase from './firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Create() {

    var usercookie = document.cookie.split("usercheck=")
    const date = new Date().toLocaleString()
    if (usercookie[1] !==undefined){
        var db = firebase.firestore().collection(usercookie[1])
    }
    
    const [noteItem, setItem] = useState([]);
    const [inpVal, setinpVal] = useState({
        title: "",
        items: "",
    });

    const inputEvent = (e) => {
        const value = e.target.value;
        const nam = e.target.name;
        setinpVal((prev) => {
            return ({ ...prev, [nam]: value })
        })
    }
    function addItem(e) {
        e.preventDefault();
        if (inpVal.items !== "") {
            setItem((prev) => {
                return [...prev, inpVal.items]
            })

        }
    }

    const deleteItem = (id) => {
        setItem((preValues) => {
            return (preValues.filter((elem, index) => {
                return index != id
            }))
        })
    }
    const saveNote = () => {
        let notes = {}
        if (inpVal.title !== "" && noteItem.length != 0) {

            notes.title = inpVal.title
            noteItem.forEach((val, index) => { notes[`item${index}`] = val })
            notes.status = 'undone'
            const timestamp = new Date().toISOString()
            notes.id = timestamp
            notes.date = date
            db.doc(timestamp).set(notes);

            toast.dark ('Note Saved Successfully', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true

                });
        }
        setinpVal({
            title: "",
            items: ""
        })
        setItem([])
    }
    

    return (<>
        <div className="create">
            Create
        <button className="save" onClick={saveNote}> Save</button>
            <form action="/">
                <div className="input">
                    <input type="text" name="title" value={inpVal.title} onChange={inputEvent} placeholder="Title" autoComplete="off" required /><br />
                    <textarea name="items" value={inpVal.items} onChange={inputEvent} placeholder="Add a Item or a Note " className="iteminput" required></textarea>
                </div>
                <button type="submit" className="add" onClick={addItem} ><i className="fas fa-plus"></i></button>
            </form>
            <ToastContainer/>
            {
                noteItem.map((elem, index) => {
                    return (
                        <List key={index} id={index} onSelect={deleteItem} item={elem} />
                    )
                })
            }
        </div>
    </>)
}

export default Create;