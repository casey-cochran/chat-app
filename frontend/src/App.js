import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Socket from './components/Socket/Socket';
import { restoreUser } from './store/userSlice.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser())
  }, []);

  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/another/test' element={null} />
        <Route path='/socket' element={<Socket />} />
      </Routes>
    </div>
  );
}

export default App;
