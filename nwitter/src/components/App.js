import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from 'fbase'

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() =>{
    //무슨일이 일어나게되면 아래의 코드가 실행되는데
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user); //어딘게 user 저장 
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  )
}

export default App;
