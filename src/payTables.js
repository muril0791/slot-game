const paytable = {
  // Padrões básicos para três símbolos iguais
  "🍒🍒🍒": 50,
  "🍋🍋🍋": 75,
  "🔔🔔🔔": 100,
  "💎💎💎": 150,
  "7️⃣7️⃣7️⃣": 250,

  // Padrões para quatro símbolos iguais
  "🍒🍒🍒🍒": 100,
  "🍋🍋🍋🍋": 150,
  "🔔🔔🔔🔔": 200,
  "💎💎💎💎": 300,
  "7️⃣7️⃣7️⃣7️⃣": 500,

  // Padrões para cinco símbolos iguais
  "🍒🍒🍒🍒🍒": 200,
  "🍋🍋🍋🍋🍋": 300,
  "🔔🔔🔔🔔🔔": 400,
  "💎💎💎💎💎": 600,
  "7️⃣7️⃣7️⃣7️⃣7️⃣": 1000,

  // Wilds e scatters
  "WILD": "wild", // 'WILD' pode ser usado para substituir qualquer outro símbolo
  "SCATTER": "scatter", // 'SCATTER' pode ter regras especiais, como pagar em qualquer posição

  // Combinações especiais e bônus
  "BÔNUS": { // Algum padrão específico ou símbolo que aciona um bônus
    win: 0, // Não dá ganho imediato
    bonusGame: true // Aciona um jogo de bônus
  },

  // Multiplicadores e rodadas grátis
  "MULTI": { // Alguma combinação que aciona um multiplicador
    winMultiplier: 2, // Duplica o ganho
    freeSpins: 10, // Concede 10 rodadas grátis
  },
};

export default paytable;
