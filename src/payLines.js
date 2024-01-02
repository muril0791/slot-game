const paylines = [
    // Linhas horizontais
    [0, 0, 0, 0, 0], // Linha superior
    [1, 1, 1, 1, 1], // Linha do meio
    [2, 2, 2, 2, 2], // Linha inferior
  
    // Linhas diagonais
    [0, 1, 2, 1, 0], // Diagonal em forma de V
    [2, 1, 0, 1, 2], // Diagonal invertida em forma de V
  
    // Formas de zigzag e outras padrões
    [0, 0, 1, 2, 2], // Zigzag começando na parte superior
    [2, 2, 1, 0, 0], // Zigzag começando na parte inferior
    [0, 1, 0, 1, 0], // W shape
    [2, 1, 2, 1, 2], // M shape
  
    // Linhas que requerem combinações específicas
    [0, 1, 1, 1, 0], // Top row, then down and up
    [2, 1, 1, 1, 2], // Bottom row, then up and down
  
    // Linhas que atravessam todas as colunas
    [0, 1, 1, 1, 2], // Top to bottom, with a dip in the middle
    [2, 1, 1, 1, 0], // Bottom to top, with a rise in the middle
  
    // Complex patterns
    [0, 0, 1, 0, 0], // Small hill at the top
    [2, 2, 1, 2, 2], // Small valley at the bottom
    // ... Adicione mais linhas de pagamento conforme necessário
  ];
  
  export default paylines;
  