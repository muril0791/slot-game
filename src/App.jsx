// src/App.jsx
import React, { useState, useEffect } from "react";
import SlotDisplay from "./Slot/SlotDisplay";
import MenuHistory from "./menu/menu-history";
import DebugMenu from "./debug/DebugMenu";
import useSlotMachine from "./Slot/hook/useSlotMachine";
import { symbols } from "./assets/symbol-icon/symbols";
import paytable from "./math/slot-pays/payTables";
import paylines from "./math/slot-pays/payLines";
import BetArea from "./bet-group/betArea";
import Snackbar from "./components/Snackbar";
import "./App.css";

const App = () => {
  const [bet, setBet] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [winningSymbols, setWinningSymbols] = useState([]);

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
    slotMachineRef,
    setHistory,
  } = useSlotMachine(100, bet, symbols, paytable, paylines);

  useEffect(() => {
    if (balance <= 0) {
      setBet(1);
    } else if (bet > balance) {
      setBet(balance);
    }
  }, [balance, bet]);

  const transformResults = (grid) => {
    const transformed = Array.from({ length: 5 }, () => Array(3).fill(null));
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        transformed[col][row] = grid[row][col];
      }
    }
    return transformed;
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => {
      setSnackbarMessage("");
    }, 3000);
  };

  const executeSpin = () => {
    if (balance < bet || isSpinning) {
      if (balance < bet) {
        setErrorMessage("Saldo insuficiente para girar.");
        showSnackbar("Saldo insuficiente para girar.", "error");
        setIsAutoplay(false);
      }
      return;
    }
    setErrorMessage("");
    setIsSpinning(true);
    setBalance((prev) => prev - bet);
    setTimeout(() => {
      const newResults = slotMachineRef.current.spin();
      setResults(newResults);
      const winResult = slotMachineRef.current.checkWin(newResults, bet);
      setLastWin(winResult.totalWin);
      setBalance((prev) => prev + winResult.totalWin);
      if (winResult.totalWin > 0) {
        showSnackbar(`Você ganhou $${winResult.totalWin}!`, "success");
        setWinningSymbols(winResult.winningSymbols);
      } else {
        setWinningSymbols([]);
      }
      const resultItem = {
        results: transformResults(newResults),
        betAmount: bet,
        winAmount: winResult.totalTotalWin,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory((prev) => [resultItem, ...prev]);
      setIsSpinning(false);
      if (isAutoplay && autoSpinCount > 0) {
        setAutoSpinCount((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount > 0) {
            setTimeout(executeSpin, 725);
          } else {
            setIsAutoplay(false);
          }
          return newCount;
        });
      }
    }, 725);
  };

  const handleSpinClick = () => {
    executeSpin();
  };

  const startAutoPlay = () => {
    if (!isAutoplay && autoSpinCount > 0 && balance >= bet) {
      setIsAutoplay(true);
      executeSpin();
    }
  };

  return (
    <div className="app-container">
      <div className="app-menu">
        {isMenuOpen && <MenuHistory history={history} />}
        <DebugMenu
          addFunds={(amount) => setBalance((prev) => prev + amount)}
          removeFunds={(amount) => setBalance((prev) => prev - amount)}
          gameState={{ balance, lastWin, isSpinning }}
          setAnimationSpeed={setAnimationSpeed}
          forceWin={() => {
            const forcedGrid = slotMachineRef.current.spin(true);
            setResults(forcedGrid);
            const fakeWin = 50;
            setLastWin(fakeWin);
            setBalance((prev) => prev + fakeWin);
            setWinningSymbols([
              [0, 0],
              [0, 1],
              [0, 2],
            ]);
          }}
          forceLose={() => {
            const forcedGrid = slotMachineRef.current.spin(false);
            setResults(forcedGrid);
            setLastWin(0);
            setWinningSymbols([]);
          }}
        />
      </div>

      <div className="layout-grid">
        <div className="left-panel"></div>
        <div className="center-panel">
          <SlotDisplay
            symbols={symbols}
            results={results}
            isSpinning={isSpinning}
            winningSymbols={winningSymbols}
            animationSpeed={animationSpeed}
          />
        </div>
        <div className="right-panel">
          <BetArea
            bet={bet}
            setBet={setBet}
            handleSpinClick={handleSpinClick}
            handleAutoPlayStart={startAutoPlay}
            balance={balance}
            autoSpinCount={autoSpinCount}
            setAutoSpinCount={setAutoSpinCount}
            isSpinning={isSpinning}
          />
          <div className="balance-info">
            <span className="balance-text">Saldo: </span>
            <span className="balance-value">${balance}</span>
          </div>
          <div className="last-win-info">
            <span className="last-win-text">Última Vitória: </span>
            <span className="last-win-value">${lastWin}</span>
          </div>
        </div>
      </div>

      {snackbarMessage && <Snackbar message={snackbarMessage} type={snackbarType} />}
    </div>
  );
};

export default App;
