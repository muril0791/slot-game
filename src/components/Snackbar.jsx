import React from 'react';
import './Snackbar.css'; // Importe o arquivo de estilos CSS

const Snackbar = ({ message, type }) => {
  return (
    <div className={`snackbar ${type}`}>
      {message}
    </div>
  );
};

export default Snackbar;
