import React from "react";
import "./SlotDisplay.css";
const SlotMachine = ({ results, isSpinning }) => {
  return (
    <div className="slotMachine">
      {results.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          {column.map((symbol, symbolIndex) => (
            <div key={symbolIndex} className={`symbol ${isSpinning ? "spin" : ""}`}>
              {symbol}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SlotMachine;
