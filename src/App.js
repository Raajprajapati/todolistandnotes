import React ,{ useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Main from "./Main";
import All from "./All";
import Deleted from "./Deleted";
import Undone from "./Undone";
import Completed from "./Completed";
import Signup from "./Signup";
function App() {

    const [isSignScreen,setScreen] = useState(true)
    const changeScreen= ()=>{
        if(isSignScreen==true){
            setScreen(false)
        }
        else{
            setScreen(true)
        }
    }
    useEffect(() => {
        let usercookie = document.cookie.split("usercheck=")

        if (usercookie[1]==undefined){
            setScreen(true)   
        }
        else if (usercookie[1] != undefined){
            setScreen(false)
        }
    }, [])

 return(<>
 {isSignScreen?<Signup screenchanger= {changeScreen}/>:
    <BrowserRouter>
    <Sidebar screenchanger= {changeScreen}/>
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/all" component={All}/>
        <Route exact path="/completed" component={Completed}/>
        <Route exact path="/deleted" component={Deleted}/>
        <Route exact path="/undone" component={Undone}/>
        <Route path="/" component={Main} />
   
    </Switch>
    </BrowserRouter>
 }

  
 </>)
}

export default App;
