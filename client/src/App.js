import './App.css';
import React, { useState, useEffect } from 'react';
import DucksList from './pages/ducksList';


function App() {
  const [activeTab, setActiveTab] = useState('warehouse');
  

  return (
    <div className="App">
   
    <nav style={{display:"flex", marginTop:"18px", width:"100%", justifyContent:"left", marginLeft:"4px",}} >
      <button className={activeTab === 'warehouse'?'button-tab':'button-untab'} onClick={() => setActiveTab('warehouse')}>
        Duck Warehouse
      </button>
      <button className={activeTab === 'warehouse'?'button-untab':'button-tab'} onClick={() => setActiveTab('store')}>
        Duck Store
      </button>
    </nav>

   

    {activeTab === 'warehouse' && (
        <DucksList mode="warehouse" />
      )}
      {activeTab === 'store' && (
        <DucksList mode="store" />
      )}
  </div>
);
}

export default App;
