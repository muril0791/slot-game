import React, { useState } from "react";
import SlotDisplay from "./Slot/SlotDisplay";
import MenuHistory from "./menu/menu-history";
import DebugMenu from "./debug/DebugMenu";
import useSlotMachine from "./Slot/hook/useSlotMachine";
import symbols from "./assets/symbol-icon/symbols";
import paytable from "./math/slot-pays/payTables";
import paylines from "./math/slot-pays/payLines";
import BetArea from "./bet-group/betArea";
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

  const handleAutoPlayStart = () => {
    startAutoPlay(autoSpinCount);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="body-app">
      <div className="App-menu">
        <button className="history-button" onClick={toggleMenu}>
          🕓
        </button>

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
        <main>
          <SlotDisplay
            results={results}
            isSpinning={isSpinning}
            symbols={symbols}
          />
          <div className="controls">
            <BetArea
              bet={bet}
              setBet={setBet}
              handleSpinClick={handleSpinClick}
              handleAutoPlayStart={handleAutoPlayStart}
              handleBetChange={handleBetChange}
              balance={balance}
              autoSpinCount={autoSpinCount}
              setAutoSpinCount={setAutoSpinCount}
              isSpinning={isSpinning}
            />
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
