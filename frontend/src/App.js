import React from 'react';
import { Route, Routes} from 'react-router-dom';
import HomeTest from './components/HomeTest/Signup';
import Socket from './components/Socket/Socket';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/signup' element={<HomeTest />} />
        <Route path='/another/test' element={null} />
        <Route path='/socket' element={<Socket />} />
      </Routes>
    </div>
  );
}

export default App;
