import { useState } from "react";
import SlotMachineClass from "../SlotMachine"; // Ajuste o caminho conforme necessário

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
    Array(5).fill(Array(3).fill(symbols[0]))
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

  const spin = () => {
    if (balance < betAmount) {
      return "Saldo insuficiente para girar.";
    }
    if (autoSpinsLeft > 0) {
      setAutoSpinsLeft(autoSpinsLeft - 1);
      setTimeout(spin, 745); // Chama spin novamente após um curto intervalo
    }
    setIsSpinning(true);
    setBalance((prevBalance) => prevBalance - betAmount);

    setTimeout(() => {
      const newResults = slotMachine.spin();
      setResults(newResults);
      const winAmount = slotMachine.checkWin(newResults);
      setLastWin(winAmount);
      setBalance((prevBalance) => prevBalance + winAmount);
      setIsSpinning(false);

      const resultItem = {
        results: newResults,
        winAmount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory((prevHistory) => [resultItem, ...prevHistory]);
    }, 745); // Ajuste o tempo de animação conforme necessário
  };
  const startAutoPlay = (numSpins) => {
    setAutoSpinsLeft(numSpins);
    spin();
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
    spin,
    setHistory,
    startAutoPlay,
    autoSpinsLeft,
  };
};

export default useSlotMachine;
