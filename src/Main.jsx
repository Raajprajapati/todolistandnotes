import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Create from './Create'
function Main(){


    return(<>
    <section className="main">
        <h2>Create here</h2>
        <Create />
        <div className = "info">All items are <NavLink to = 'all'>here</NavLink></div>
        
    </section>
    
    
    </>)
}

export default Main;
