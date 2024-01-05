// import React from "react";
// import "./menu-history.css"; 

// const MenuHistory = ({ history }) => {
//   return (
//     <div className="menu-history">
//       <h2>Histórico</h2>

//       {history.map((item, index) => (
//         <div key={index} className="history-item">
//           <div className="mini-slot">
//             {item.results.map((column, columnIndex) => (
//               <div key={columnIndex} className="mini-row">
//                 {column.map((symbol, symbolIndex) => (
//                   <div key={symbolIndex} className="mini-cell">
//                     {symbol}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div className="bet-amount">{"Aposta: $" + item.betAmount}</div>
//           <div className="win-amount">{"Ganho: $" + item.winAmount}</div>
//           <div className="timestamp">{"Hora: " + item.timestamp}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MenuHistory;
// MenuHistory.jsx

import React from "react";
import "./menu-history.css"; 

const MenuHistory = ({ history }) => {
  return (
    <div className="menu-history">
      <h2>Histórico</h2>

      {history.map((item, index) => (
        <div key={index} className="history-item">
          <div className="history-details">
            <div>Aposta: ${item.betAmount}</div>
            <div>Ganho: ${item.winAmount}</div>
            <div>Hora: {item.timestamp}</div>
          </div>
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
      ))}
    </div>
  );
};

export default MenuHistory;
