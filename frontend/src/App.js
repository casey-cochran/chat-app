import React from 'react';
import { Route, Routes} from 'react-router-dom';
import HomeTest from './components/HomeTest/HomeTest';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/test' element={<HomeTest />} />
      </Routes>
    </div>
  );
}

export default App;