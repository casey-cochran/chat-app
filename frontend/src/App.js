import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login.js';
import HomeTest from './components/Signup/Signup.js';
import Socket from './components/Socket/Socket';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/signup' element={<HomeTest />} />
        <Route path='/login' element={<Login />} />
        <Route path='/another/test' element={null} />
        <Route path='/socket' element={<Socket />} />
      </Routes>
    </div>
  );
}

export default App;
