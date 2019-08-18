import React from 'react';
import './App.css';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PasswordStrengthIndicator />
      </header>
    </div>
  );
}

export default App;
