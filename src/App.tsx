import React from 'react';
import UserComponent from './UserComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Тестовое задание. Название = "React effect"</h1>
      <UserComponent />
    </div>
  );
};

export default App;