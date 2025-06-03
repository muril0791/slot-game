import React from "react";
import "./menu-history.css";

const MenuHistory = ({ history }) => {
  return (
    <div className="menu-history">
      <h2>Histórico</h2>
      {history.map((item, index) => (
        <div key={index} className="history-card">
          <div className="history-results">
            <div className="history-order-number">Nº {index + 1}</div>
            <div className="divider"></div>
            <div className="history-details">
              <div>Aposta: ${item.betAmount}</div>
              <div>Ganho: ${item.winAmount}</div>
              <div>
                Ganho Líquido: ${item.winAmount - item.betAmount}
              </div>
              <div>Hora: {item.timestamp}</div>
            </div>
            <div className="history-item">
              {/* Aqui item.results já é [5][3] */}
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
