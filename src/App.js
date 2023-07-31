import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import "./App.css"

function App(){
  const [{ user }, dispatch] = useStateValue();
   
  return(
    <div className="app">
      {/* If there is no user show login screen */}
      {!user ? (
        <Login/>
      )
      :{/* otherwise, show app screen */}
      (
      <div className="app_body">
        <Router>
          <Routes>
            <Route path="/" element={(
              <>
                <Sidebar/>
                <Chat/>
              </>
              )}>
            </Route>
            {/* Show messages based on room */}
            <Route path="/rooms/:roomId" element={(
              <>
                <Sidebar/>
                <Chat/>
              </> 
              )}>
            </Route>
          </Routes>
        </Router>
      </div>)
      }
    </div>
  )
};

export default App;