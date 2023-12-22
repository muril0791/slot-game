// DebugMenu.js
import React, { useState } from 'react';
import './DebugMenu.css'; // Certifique-se de que este arquivo contém todos os estilos necessários

const DebugMenu = ({ addFunds, forceWin, forceLose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="debug-menu">
      <button onClick={() => setIsOpen(!isOpen)}>Debug Menu</button>
      {isOpen && (
        <div className="debug-options">
          <button onClick={forceWin}>Forçar Vitória</button>
          <button onClick={forceLose}>Forçar Derrota</button>
          <button onClick={() => addFunds(100)}>Adicionar $100</button>
        </div>
      )}
    </div>
  );
};

export default DebugMenu;
