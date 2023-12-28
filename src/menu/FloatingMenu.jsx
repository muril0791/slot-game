import React from "react";

const FloatingMenu = ({ openHistory, clearHistory }) => {
  return (
    <div className="floating-menu">
      <button onClick={openHistory}>Histórico</button>
      <button onClick={clearHistory}>Limpar Histórico</button>
    </div>
  );
};

export default FloatingMenu;
