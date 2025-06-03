// src/Slot/hook/useSlotMachine.jsx

import { useState, useRef } from "react";
import SlotMachineClass from "../../math/SlotMachine";

const useSlotMachine = (
  initialBalance,
  betAmount,
  symbols,
  paytable,
  paylines,
  wildSymbol = null,
  scatterSymbol = null
) => {
  const [balance, setBalance] = useState(initialBalance);
  const [lastWin, setLastWin] = useState(0);
  const initialGrid = Array.from({ length: 3 }, () =>
    Array.from({ length: 5 }, () => symbols[0])
  );
  const [results, setResults] = useState(initialGrid);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState([]);
  const [autoSpinsLeft, setAutoSpinsLeft] = useState(0);
  const slotMachineRef = useRef(null);
  if (!slotMachineRef.current) {
    slotMachineRef.current = new SlotMachineClass(
      symbols,
      paytable,
      paylines,
      wildSymbol,
      scatterSymbol
    );
  }
  const startAutoPlay = (numSpins) => {
    setAutoSpinsLeft(numSpins);
  };
  return {
    balance,
    setBalance,
    lastWin,
    setLastWin,
    results,
    setResults,
    isSpinning,
    setIsSpinning,
    history,
    setHistory,
    slotMachineRef,
    autoSpinsLeft,
    startAutoPlay,
  };
};

export default useSlotMachine;
