import React, { useState } from "react";
import SlotDisplay from "./Slot/SlotDisplay";
import MenuHistory from "./menu/menu-history";
import DebugMenu from "./debug/DebugMenu";
import useSlotMachine from "./Slot/hook/useSlotMachine";
import { symbols } from './assets/symbol-icon/symbols';
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
  } = useSlotMachine(100, bet, symbols, paytable, paylines);

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

  const executeSpin = () => {
    if (balance < bet) {
      setErrorMessage("Saldo insuficiente para girar.");
      showSnackbar("Saldo insuficiente para girar.", "error");
      setIsAutoplay(false); // Parar o autoplay se o saldo for insuficiente
      return;
    }
  
    setErrorMessage("");
    setBalance(prev => prev - bet);
    setIsSpinning(true); // Iniciar animação de spin
  
    setTimeout(() => {
      const newResults = slotMachine.spin();
      const transformedResults = transformResults(newResults);
      setResults(transformedResults);
      const winAmount = slotMachine.checkWin(transformedResults, bet);
      setLastWin(winAmount);
      setBalance(prev => prev + winAmount);
  
      if (winAmount > 0) {
        showSnackbar(`Você ganhou $${winAmount}!`, "success");
      }
  
      const resultItem = {
        results: transformedResults,
        betAmount: bet,
        winAmount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory(prevHistory => [resultItem, ...prevHistory]);
  
      setIsSpinning(false); // Parar animação de spin
  
      if (isAutoplay && autoSpinCount > 0) {
        setAutoSpinCount(prevCount => prevCount - 1);
        if (autoSpinCount > 1) {
          setTimeout(executeSpin, 725); // Aguardar a animação terminar antes do próximo spin
        } else {
          setIsAutoplay(false); // Desativa o autoplay se não houver mais spins
        }
      }
    }, 725); // Tempo de duração da animação de spin
  };
  
  const handleSpinClick = () => {
    executeSpin();
  };

  const startAutoPlay = () => {
    if (!isAutoplay && autoSpinCount > 0) {
      setIsAutoplay(true);
      executeSpin();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => {
      setSnackbarMessage("");
    }, 3000);
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
          removeFunds={(amount) => setBalance((prev) => prev - amount)}
          gameState={{ balance, lastWin, isSpinning }}
          setAnimationSpeed={setAnimationSpeed}
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
        />
      </div>
      <div className="App">
        <main>
          <SlotDisplay
            results={results}
            isSpinning={isSpinning}
            symbols={symbols}
            animationSpeed={animationSpeed}
          />
          <div className="controls">
            <BetArea
              bet={bet}
              setBet={setBet}
              handleSpinClick={handleSpinClick}
              handleAutoPlayStart={startAutoPlay}
              handleBetChange={(e) => setBet(parseInt(e.target.value, 10))}
              balance={balance}
              autoSpinCount={autoSpinCount}
              setAutoSpinCount={setAutoSpinCount}
              isSpinning={isSpinning}
            />
            {snackbarMessage && (
              <Snackbar message={snackbarMessage} type={snackbarType} />
            )}
          </div>
          <div className="info-bet">
            <div>Saldo: <span className="balance-display">${balance}</span></div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div>Última Vitória: <span className="last-win-display">${lastWin}</span></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
