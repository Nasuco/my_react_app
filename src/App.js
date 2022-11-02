import { useState } from 'react';
import './App.css';
import MenuAppBar from './AppBar';

function App() {
  const [nama, setName] =  useState('Rizky');
  return (
    <div className="App">
      <h2>Aplikasi Kontak App</h2>
      <ListKontak />
    </div>
  );
}

export default App;
