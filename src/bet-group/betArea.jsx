import React from "react";
import { ImSpinner11 } from "react-icons/im";
import { IoPlaySharp } from "react-icons/io5";
import "./betArea.css";

const BetArea = ({
  bet,
  setBet,
  handleSpinClick,
  handleAutoPlayStart,
  balance,
  autoSpinCount,
  setAutoSpinCount,
  isSpinning,
}) => {
  // Garante que o valor de aposta fique entre 1 e 100
  const normalizeBet = (value) => {
    let v = parseInt(value, 10) || 1;
    if (v < 1) v = 1;
    if (v > 100) v = 100;
    return v;
  };

  return (
    <div className="bet-area-vertical">
      {/* Campo de aposta (bet) */}
      <input
        type="number"
        className="bet-input-side"
        value={bet}
        onChange={(e) => {
          const v = normalizeBet(e.target.value);
          setBet(v);
        }}
        min="1"
        max="100"
        disabled={isSpinning || balance < 1}
      />

      {/* Botão de girar */}
      <button
        className="side-button spin-button"
        onClick={handleSpinClick}
        disabled={
          isSpinning ||
          bet < 1 ||
          bet > 100 ||
          bet > balance ||
          balance < 1
        }
      >
        {isSpinning ? <ImSpinner11 className="spinner-icon" /> : <IoPlaySharp />}
      </button>

      {/* Campo auto-spin (quantidade) */}
      <input
        type="number"
        className="bet-input-side"
        value={autoSpinCount}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10) || 0;
          setAutoSpinCount(v);
        }}
        min="1"
        disabled={isSpinning || balance < 1}
      />

      {/* Botão AutoPlay */}
      <button
        className="side-button autoplay-button"
        onClick={handleAutoPlayStart}
        disabled={
          isSpinning ||
          autoSpinCount < 1 ||
          bet < 1 ||
          bet > 100 ||
          bet > balance ||
          balance < 1
        }
      >
        🔁
      </button>
    </div>
  );
};

export default BetArea;
