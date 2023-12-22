import React, { useState } from "react";
import SlotMachine from "./Slot/SlotMachine";
import DebugMenu from "./debug/DebugMenu";
import "./App.css";

const App = () => {
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(1);
  const [lastWin, setLastWin] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState(Array(5).fill(Array(3).fill("🍒")));

  const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
  const paylines = [
    // Linhas horizontais
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], // Linha superior
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], // Linha do meio
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]], // Linha inferior
  
    // Linhas diagonais
    [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]], // Diagonal de cima para baixo
    [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]], // Diagonal de baixo para cima
  
    // Linhas em forma de V
    [[0, 0], [1, 0], [2, 1], [3, 0], [4, 0]], // V de cabeça para baixo
    [[0, 2], [1, 2], [2, 1], [3, 2], [4, 2]], // V normal
  
    // Linhas ziguezague
    [[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]], // Ziguezague começando em cima
    [[0, 2], [1, 1], [2, 2], [3, 1], [4, 2]], // Ziguezague começando em baixo
  
    // Outras combinações variadas
    [[0, 1], [1, 0], [2, 1], [3, 2], [4, 1]], // Outro padrão
    [[0, 1], [1, 2], [2, 1], [3, 0], [4, 1]], // Mais um padrão
    // Adicione mais linhas conforme desejado
  ];
  

  const spin = () => {
    if (balance < bet) {
      alert("Saldo insuficiente para girar.");
      return;
    }
  
    setIsSpinning(true);
  
    // Define uma nova sequência de símbolos
    setTimeout(() => {
      const newResults = results.map(column =>
        column.map(() => symbols[Math.floor(Math.random() * symbols.length)])
      );
  
      setResults(newResults);
      const winAmount = checkForWin(newResults);
      setLastWin(winAmount);
      setBalance(balance - bet + winAmount);
      setIsSpinning(false);
    }, 1000); // O tempo aqui deve corresponder à duração da sua animação
  };

  const checkForWin = (newResults) => {
    let winAmount = 0;
    for (let line of paylines) {
      const firstSymbol = newResults[line[0][0]][line[0][1]];
      if (line.every(([col, row]) => newResults[col][row] === firstSymbol)) {
        winAmount += 10; // Altere de acordo com sua tabela de pagamentos
      }
    }
    return winAmount;
  };

  const forceWin = () => {
    const winSymbol = symbols[0]; // Altere para o símbolo desejado
    const winningResults = Array(5).fill(Array(3).fill(winSymbol));
    setResults(winningResults);
    setLastWin(50); // Valor arbitrário para a vitória forçada
    setBalance(balance - bet + 50); // Atualiza o saldo
  };

  const forceLose = () => {
    const losingResults = Array(5).fill(Array(3).fill(symbols[1])); // Altere para símbolos que não resultam em vitória
    setResults(losingResults);
    setLastWin(0);
    setBalance(balance - bet);
  };

  const addFunds = (amount) => {
    setBalance(balance + amount);
  };

  const handleBetChange = (e) => {
    const newBet = parseInt(e.target.value, 10);
    if (!isNaN(newBet) && newBet > 0 && newBet <= balance) {
      setBet(newBet);
    }
  };

  return (
    <div className="App">
      <input
        type="number"
        value={bet}
        onChange={handleBetChange}
        min="1"
        max={balance}
      />
      <SlotMachine results={results} spin={spin} isSpinning={isSpinning} />
      <DebugMenu
        addFunds={addFunds}
        forceWin={forceWin}
        forceLose={forceLose}
      />
      <div className="balance">Saldo: ${balance}</div>
      {lastWin > 0 && (
        <div className="winMessage">Você ganhou: ${lastWin}!</div>
      )}
    </div>
  );
};

export default App;
