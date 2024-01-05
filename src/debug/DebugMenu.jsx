import React, { useState } from 'react';
import './DebugMenu.css';

const DebugMenu = ({ addFunds, forceWin, forceLose, removeFunds, gameState, setAnimationSpeed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fundsToModify, setFundsToModify] = useState(100);
  const [animationSpeed, setLocalAnimationSpeed] = useState(1);

  const handleAddFunds = () => {
    addFunds(Math.abs(parseInt(fundsToModify, 10)));
  };

  const handleRemoveFunds = () => {
    removeFunds(Math.abs(parseInt(fundsToModify, 10)));
  };

  const handleAnimationSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    setLocalAnimationSpeed(speed);
    setAnimationSpeed(speed);
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
        <div className="game-state-viewer">
          <h3>Estado do Jogo:</h3>
          <p>Saldo: {gameState.balance}</p>
          <p>Última Vitória: {gameState.lastWin}</p>
          <p>Está Girando: {gameState.isSpinning ? "Sim" : "Não"}</p>
        </div>
        <div className="animation-speed-control">
          <label htmlFor="animation-speed">Velocidade de Animação:</label>
          <input
            type="range"
            id="animation-speed"
            min="0.1"
            max="3"
            step="0.1"
            value={animationSpeed}
            onChange={handleAnimationSpeedChange}
          />
        </div>
      </div>
      <button className="debug-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '<' : '>'}
      </button>
    </div>
  );
};

export default DebugMenu;
