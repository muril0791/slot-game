import React from "react";
import "./menu-history.css";

const MenuHistory = ({ history }) => {
  return (
    <div className="menu-history">
      <h2>Histórico</h2>

      {history.map((item, index) => (
        <div className="history-card">
          <div key={index} className="history-results">
            <div className="history-order-number"> Nº {index + 1}</div>{" "}
            <div className="divider"></div>
            {/* Número de ordem */}
            <div className="history-details">
              <div>Aposta: ${item.betAmount}</div>
              <div>Ganho: ${item.winAmount}</div>
              <div>Hora: {item.timestamp}</div>
            </div>
            {/* <div className="winning-symbols">
              Símbolos Vencedores:{" "}
              {item.winningSymbols &&
                item.winningSymbols.map((symbol, i) => (
                  <span key={i} className="winning-symbol">
                    {symbol.join(", ")}
                  </span> // Exibindo símbolos vencedores
                ))}
            </div> */}
            <div className="history-item">
              {item.results.map((column, columnIndex) => (
                <div key={columnIndex} className="history-row">
                  {column.map((symbol, symbolIndex) => (
                    <div key={symbolIndex} className="history-cell">
                      {symbol}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuHistory;
