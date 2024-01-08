import { useState } from "react";
import SlotMachineClass from "../../math/SlotMachine"; // Ajuste o caminho conforme necessário

const useSlotMachine = (
  initialBalance,
  betAmount,
  symbols,
  paytable,
  paylines,
  wildSymbol,
  scatterSymbol
) => {
  const [balance, setBalance] = useState(initialBalance);
  const [lastWin, setLastWin] = useState(0);
  const [results, setResults] = useState(
    Array(3).fill(Array(5).fill(symbols[0]))
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState([]);
  const [autoSpinsLeft, setAutoSpinsLeft] = useState(0);
  const slotMachine = new SlotMachineClass(
    symbols,
    paytable,
    paylines,
    wildSymbol,
    scatterSymbol
  );

  const startAutoPlay = (numSpins) => {
    setAutoSpinsLeft(numSpins);
  };
  return {
    balance,
    setBalance,
    lastWin,
    results,
    setLastWin,
    setResults,
    isSpinning,
    setIsSpinning,
    history,
    slotMachine,
    setHistory,
    startAutoPlay,
    autoSpinsLeft,
  };
};

export default useSlotMachine;
