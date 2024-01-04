import React, { useState } from "react";
import SlotDisplay from "./Slot/SlotDisplay";
import MenuHistory from "./menu/menu-history";
import DebugMenu from "./debug/DebugMenu";
import useSlotMachine from "./Slot/hook/useSlotMachine";
import symbols from "./symbols";
import paytable from "./payTables";
import paylines from "./payLines";
import "./App.css";

const App = () => {
  const [bet, setBet] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState(0);
  const {
    balance,
    setBalance,
    lastWin,
    setLastWin,
    results,
    setResults,
    isSpinning,
    setIsSpinning,
    history,
    slotMachine,
    setHistory,
    startAutoPlay,
  } = useSlotMachine(100, bet, symbols, paytable, paylines, "WILD", "SCATTER");

  const transformResults = (results) => {
    const transformed = Array(5)
      .fill()
      .map(() => Array(3));
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        transformed[col][row] = results[row][col];
      }
    }
    return transformed;
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

  const handleSpinClick = () => {
    if (balance < bet) {
      setErrorMessage("Saldo insuficiente para girar.");
      return;
    }

    setIsSpinning(true);
    setErrorMessage("");
    setBalance((prev) => prev - bet);

    setTimeout(() => {
      const newResults = slotMachine.spin();
      const transformedResults = transformResults(newResults);
      setResults(transformedResults);
      const winAmount = slotMachine.checkWin(transformedResults);
      setLastWin(winAmount);
      setBalance((prev) => prev + winAmount);
      setIsSpinning(false);

      const resultItem = {
        results: transformedResults,
        winAmount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory((prevHistory) => [resultItem, ...prevHistory]);
    }, 725);
  };
  const handleAutoPlayChange = (e) => {
    setAutoSpinCount(parseInt(e.target.value, 10));
  };

  const handleAutoPlayStart = () => {
    startAutoPlay(autoSpinCount);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="App-menu">
        <header className="menus">
          <button onClick={toggleMenu}>🕓</button>
        </header>

        {isMenuOpen && <MenuHistory history={history} />}
        <DebugMenu
          addFunds={(amount) => setBalance((prev) => prev + amount)}
          forceWin={() => {
            const winAmount = 50;
            setResults(slotMachine.spin(true));
            setLastWin(winAmount);
            setBalance((prevBalance) => prevBalance + winAmount);
          }}
          forceLose={() => {
            setResults(slotMachine.spin(false));
            setLastWin(0);
          }}
          removeFunds={(amount) => setBalance((prev) => prev - amount)}
        />
      </div>
      <div className="App">
        <main className="main-content">
          <SlotDisplay
            results={results}
            isSpinning={isSpinning}
            symbols={symbols}
          />
          <div className="controls">
            <input
              type="number"
              className="bet-input"
              value={bet}
              onChange={handleBetChange}
              min="1"
              max="50"
              disabled={isSpinning}
            />
            <button
              className="spin-button"
              onClick={handleSpinClick}
              disabled={isSpinning || bet > balance}
            >
              {isSpinning ? "Girando..." : "Girar"}
            </button>
            <input
              type="number"
              value={autoSpinCount}
              onChange={handleAutoPlayChange}
              min="1"
              disabled={isSpinning}
            />
            <button onClick={handleAutoPlayStart} disabled={isSpinning}>
              Iniciar AutoPlay
            </button>
            <div className="balance-display">Saldo: ${balance}</div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="last-win-display">Última Vitória: ${lastWin}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
