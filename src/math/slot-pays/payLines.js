// src/math/slot-pays/payLines.js

/**
 * Cada payline é um array de pares [row, col], identificando as
 * coordenadas (linha, coluna) no grid 3×5.
 */

const paylines = [
  // Horizontais (trincas): topo, meio, fundo
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 2],
    [0, 3],
    [0, 4],
  ],

  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  [
    [1, 2],
    [1, 3],
    [1, 4],
  ],

  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [2, 1],
    [2, 2],
    [2, 3],
  ],
  [
    [2, 2],
    [2, 3],
    [2, 4],
  ],

  // Verticais (cada coluna completa: 3 símbolos)
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 3],
    [1, 3],
    [2, 3],
  ],
  [
    [0, 4],
    [1, 4],
    [2, 4],
  ],
];

export default paylines;
