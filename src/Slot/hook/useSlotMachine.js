import { useState } from 'react';
import SlotMachineClass from "../SlotMachine"; // Ajuste o caminho conforme necessário
import paylines from '../../payLines';

const useSlotMachine = (initialBalance, betAmount, symbols, paytable, paylines, wildSymbol, scatterSymbol) => {
  const [balance, setBalance] = useState(initialBalance);
  const [lastWin, setLastWin] = useState(0);
  const [results, setResults] = useState(Array(5).fill(Array(3).fill(symbols[0])));
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState([]);

  const slotMachine = new SlotMachineClass(symbols, paytable, paylines, wildSymbol, scatterSymbol);

  const spin = () => {
    if (balance < betAmount) {
      return "Saldo insuficiente para girar.";
    }

    setIsSpinning(true);
    setBalance(prevBalance => prevBalance - betAmount);

   setTimeout(() => {
    const newResults = slotMachine.spin();
    setResults(newResults);
    const winAmount = slotMachine.checkWin(newResults);
    setLastWin(winAmount);
    setBalance(prevBalance => prevBalance + winAmount);
    setIsSpinning(false);

    const resultItem = {
      results: newResults,
      winAmount,
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory(prevHistory => [resultItem, ...prevHistory]);
  }, 745); // Ajuste o tempo de animação conforme necessário
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
    setHistory
  };
};

export default useSlotMachine;
