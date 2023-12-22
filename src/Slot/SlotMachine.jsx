import React from 'react';
import './SlotMachine.css';

const SlotMachine = ({ results, spin, isSpinning }) => {
  return (
    <div className="slotMachine">
      {results.map((column, columnIndex) => (
        <div key={columnIndex} className={`column ${isSpinning ? 'spin' : ''}`}>
          {column.map((symbol, symbolIndex) => (
            <div key={symbolIndex} className="symbol">
              {symbol}
            </div>
          ))}
        </div>
      ))}
      <button onClick={spin} className="spin-button">
        🔄 Girar
      </button>
    </div>
  );
};

export default SlotMachine;
