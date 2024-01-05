const paylines = [
  // Linhas horizontais
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // Linha superior
  [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // Linha do meio
  [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // Linha inferior

  // Linhas verticais (apenas sequências de 3)
  [[0, 0], [1, 0], [2, 0]], // Coluna 1
  [[0, 1], [1, 1], [2, 1]], // Coluna 2
  [[0, 2], [1, 2], [2, 2]], // Coluna 3
  [[0, 3], [1, 3], [2, 3]], // Coluna 4
  [[0, 4], [1, 4], [2, 4]], // Coluna 5

  // Diagonais
  [[0, 0], [1, 1], [2, 2]], // Diagonal da esquerda superior para direita inferior
  [[2, 0], [1, 1], [0, 2]], // Diagonal da esquerda inferior para direita superior

  // Zigzag e outros padrões
  [[0, 0], [1, 1], [0, 2], [1, 3], [0, 4]], // Zigzag começando na parte superior
  [[2, 0], [1, 1], [2, 2], [1, 3], [2, 4]], // Zigzag começando na parte inferior

  // Outras combinações complexas podem ser adicionadas aqui
];

export default paylines;
