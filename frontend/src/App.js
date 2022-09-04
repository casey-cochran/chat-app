import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Socket from './components/Socket/Socket';
import { restoreUser } from './store/userSlice.js';
import Navigation from './components/Navbar/Navbar.js';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(restoreUser())
  }, []);

  return (
    <div >
      <Navigation />
      {user.user &&
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/another/test' element={null} />
        <Route path='/socket' element={<Socket />} />
      </Routes>
}
    </div>
  );
}

export default App;
