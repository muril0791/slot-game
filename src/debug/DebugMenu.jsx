import React, { useState } from 'react';
import './DebugMenu.css';

const DebugMenu = ({ addFunds, forceWin, forceLose, removeFunds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fundsToModify, setFundsToModify] = useState(100);

  const handleAddFunds = () => {
    addFunds(Math.abs(parseInt(fundsToModify, 10)));
  };

  const handleRemoveFunds = () => {
    removeFunds(Math.abs(parseInt(fundsToModify, 10)));
  };

  return (
    <div className={`debug-menu ${isOpen ? 'open' : ''}`}>
      <div className="debug-menu-content">
        <button onClick={forceWin}>Forçar Vitória</button>
        <button onClick={forceLose}>Forçar Derrota</button>
        <div className="funds-control">
          <input
            type="number"
            value={fundsToModify}
            onChange={(e) => setFundsToModify(e.target.value)}
          />
          <button onClick={handleAddFunds}>Adicionar Fundos</button>
          <button onClick={handleRemoveFunds}>Remover Fundos</button>
        </div>
      </div>
      <button className="debug-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '<' : '>'}
      </button>
    </div>
  );
};

export default DebugMenu;
