
import {useState} from 'react'

import Home from "./Components/Home";
import Login from './Components/Login'
import Signup from './Components/Signup'
import Singlemovie from './Components/Singlemovie'
import {ShareProvider} from './CreateContext/SharedContext'
import {UserProvider} from './CreateContext/userContext'
import {useUser} from './CreateContext/userContext'
import Movies from './Components/Movies'
import Bookmark from './Components/Bookmarks'


import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
function App() {
 const {isAuthenticated} = useUser()
console.log('IsAuthenticated in App', isAuthenticated)
 

  
  return (
    <div>
       <Router>
      
       <UserProvider>
        <ShareProvider>
         
       <Routes>
          <Route path="/" element={<Home />}></Route>
           <Route path="/movies" element={<Movies/>}></Route>
          
          <Route path="/movies/:slug/" element={<Singlemovie />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/movies/:slug" element={<Singlemovie/>}></Route>
          <Route path = '/bookmark' element = {<Bookmark/>}></Route>
        </Routes>
        </ShareProvider>
       </UserProvider>
      
      </Router>
    </div>
  
  );
}

export default App;
