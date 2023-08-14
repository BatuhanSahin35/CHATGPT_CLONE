// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Chatbot from './Chatbot';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    /*<div>
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <Chatbot />}
    </div>
    */
   <div>
    <Chatbot />
   </div>
   
  );
};

export default App;
