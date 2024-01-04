import React from "react";
import { ImSpinner11 } from "react-icons/im";
import { IoStopOutline } from "react-icons/io5";
import './betArea.css'

const BetArea = ({ bet, setBet, handleSpinClick, handleAutoPlayStart, handleBetChange, balance, autoSpinCount, setAutoSpinCount, isSpinning }) => {
  return (
    <div className="bet-area">
       <input
        type="number"
        className="bet-input"
        value={bet}
        onChange={handleBetChange} // Usa a função handleBetChange passada do App.jsx
        min="1"
        max="50"
        disabled={isSpinning}
      />
      <button
        className="spin-button"
        onClick={handleSpinClick}
        disabled={isSpinning || bet > balance}
      >
        {isSpinning ? <IoStopOutline /> : <ImSpinner11 />}
      </button>
      <input
        type="number"
        value={autoSpinCount}
        onChange={(e) => setAutoSpinCount(parseInt(e.target.value, 10))}
        min="1"
        disabled={isSpinning}
      />
      <button onClick={handleAutoPlayStart} disabled>
        AutoPlay
      </button>
    </div>
  );
};

export default BetArea;
