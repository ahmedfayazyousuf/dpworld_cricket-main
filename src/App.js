import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Success from './Components/Success';
import Leaderboard2 from './Components/Leaderboard2';
import Player1Registration from './Components/Player1_Registration';
import Game from './Components/Game';
import TestSocket from './Components/TestSocket';
import TestSocket2 from './Components/TestSocket2';
import Mobile from './Components/Mobile';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Player1Registration />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Leaderboard2" element={<Leaderboard2 />} />
          <Route path="/Registration" element={<Player1Registration />} />
          <Route path="/Test" element={<TestSocket />} />
          <Route path="/Test2" element={<TestSocket2 />} />

          <Route path="/Mobile" element={<Mobile />} />


        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;