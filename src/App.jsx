import React, { useState } from "react";
import SlotMachineClass from "./Slot/SlotMachine";
import SlotDisplay from "./Slot/SlotDisplay";
import MenuHistory from "./menu/menu-history";
import FloatingMenu from "./menu/FloatingMenu"; // Importe o componente FloatingMenu
import DebugMenu from "./debug/DebugMenu"; // Importe o componente DebugMenu
import "./App.css";

const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣", "🃏"];
const wildSymbol = "W";
const paytable = {
  AAA: 10,
  AAAA: 40,
  AAAAA: 200,
  BBB: 5,
  BBBB: 25,
  BBBBB: 100,
  CCC: 3,
  CCCC: 15,
  CCCCC: 75,
  DDD: 2,
  DDDD: 10,
  DDDDD: 50,
  EEE: 1,
  EEEE: 5,
  EEEEE: 25,
  WWW: 50,
  WWWW: 200,
  WWWWW: 1000,
  // Combinações com 2 wilds
  WWX: 30,
  WWXX: 100,
  WWXXX: 500,
  // Combinações com 1 wild
  WXX: 15,
  WXXX: 75,
  WXXXX: 250,
  // Combinações com wilds e outros símbolos específicos
  AWW: 20,
  AWWW: 80,
  AWWWW: 400,
  BWW: 10,
  BWWW: 40,
  BWWWW: 200,
  CWW: 6,
  CWWW: 24,
  CWWWW: 120,
  DWW: 4,
  DWWW: 16,
  DWWWW: 80,
  EWW: 2,
  EWWW: 8,
  EWWWW: 40,
  // ... e assim por diante para cada combinação de símbolo regular com wilds ...
};

const slotMachine = new SlotMachineClass(symbols, paytable, wildSymbol);

const App = () => {
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(1);
  const [lastWin, setLastWin] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState(Array(5).fill(Array(3).fill("🍒")));
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Adicionado estado para controlar a abertura do menu
  const [isDebugOpen, setIsDebugOpen] = useState(false); // Adicionado estado para controlar a abertura do menu de depuração

  const spin = () => {
    if (balance < bet) {
      setErrorMessage("Saldo insuficiente para girar.");
      return;
    }

    setErrorMessage("");
    setBalance((prevBalance) => prevBalance - bet);
    setIsSpinning(true);

    setTimeout(() => {
      const newResults = slotMachine.spin();
      setResults(newResults);
      const winAmount = slotMachine.checkWin(newResults);
      setLastWin(winAmount);
      setBalance((prevBalance) => prevBalance + winAmount);
      setIsSpinning(false);

      // Adicione o resultado ao histórico
      const resultItem = {
        results: newResults,
        winAmount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory((prevHistory) => [resultItem, ...prevHistory]);
    }, 2000); // Este é o tempo da animação do giro, ajuste conforme necessário
  };

  const handleBetChange = (e) => {
    const newBet = parseInt(e.target.value, 10);
    if (!isNaN(newBet) && newBet > 0 && newBet <= balance) {
      setBet(newBet);
      setErrorMessage("");
    } else {
      setErrorMessage("Aposta inválida.");
    }
  };

  // Função para alternar a abertura/fechamento do menu
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  // Função para alternar a abertura/fechamento do menu de depuração
  const toggleDebugMenu = () => {
    setIsDebugOpen((prevIsDebugOpen) => !prevIsDebugOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleMenu}>Menu History</button>{" "}
      </header>

      <div className="menu-container">
        {isMenuOpen && <MenuHistory history={history} />}
      </div>

      {isDebugOpen && (
        <DebugMenu
          addFunds={(amount) => setBalance((prev) => prev + amount)}
          forceWin={() => {
            const winAmount = 50;
            setResults(slotMachine.spin());
            setLastWin(winAmount);
            setBalance((prevBalance) => prevBalance + winAmount);
          }}
          forceLose={() => {
            setResults(slotMachine.spin());
            setLastWin(0);
          }}
          removeFunds={(amount) => setBalance((prev) => prev - amount)}
        />
      )}
      <main className="main-content">
        <SlotDisplay results={results} isSpinning={isSpinning} />
        <div className="controls">
          <input
            type="number"
            className="bet-input"
            value={bet}
            onChange={handleBetChange}
            min="1"
            max={balance}
            disabled={isSpinning}
          />
          <button
            className="spin-button"
            onClick={spin}
            disabled={isSpinning || bet > balance}
          >
            {isSpinning ? "Girando..." : "Girar"}
          </button>
          <div className="balance-display">Saldo: ${balance}</div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </main>
      <footer className="App-footer">
        <button onClick={toggleDebugMenu}>Toggle Debug Menu</button>{" "}
        {/* Botão para abrir/fechar o menu de depuração */}
      </footer>
    </div>
  );
};

export default App;
