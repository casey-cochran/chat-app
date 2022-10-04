import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate} from 'react-router-dom';
import Messenger from './components/Messenger/Messenger.js';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Socket from './components/Socket/Socket';
import { restoreUser } from './store/userSlice.js';
import Navigation from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)

  useEffect(() => {
     dispatch(restoreUser())
    //  .then(() => {if(!user.user) navigate('/login')})
  }, []);


  return (
    <div className='h-100' >
       {user.user && <Navigation />}

      <Routes>
        <Route path='/login' element={<Login />} />
      {/* {user.user && <> */}
        <Route path='/' element={<Home />} />
        <Route path='/messenger' element={<Messenger />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/another/test' element={null} />
        <Route path='/socket' element={<Socket />} />
        {/* </>} */}
      </Routes>

    </div>
  );
}

export default App;
