import React from "react";
import "./menu-history.css"; 

const MenuHistory = ({ history }) => {
  return (
    <div className="menu-history">
      <h2>Histórico</h2>

      {history.map((item, index) => (
        <div key={index} className="history-item">
          <div className="mini-slot">
            {item.results.map((column, rowIndex) => (
              <div key={rowIndex} className="mini-row">
                {column.map((symbol, symbolIndex) => (
                  <div key={symbolIndex} className="mini-cell">
                    {symbol}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="win-amount">{"Ganho: $" + item.winAmount}</div>
          <div className="timestamp">{"Hora: " + item.timestamp}</div>
        </div>
      ))}
       {/* <button className="debug-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '<' : '>'}
      </button> */}
    </div>
  );
};

export default MenuHistory;