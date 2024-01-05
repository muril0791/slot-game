class SlotMachine {
  constructor(symbols, paytable, paylines, wildSymbol, scatterSymbol, rows = 3, columns = 5) {
    this.symbols = symbols;
    this.paytable = paytable;
    this.paylines = paylines;
    this.wildSymbol = wildSymbol;
    this.scatterSymbol = scatterSymbol;
    this.rows = rows;
    this.columns = columns;
  }

  generateSpinResult() {
    const random = Math.random() * 100;
    let grid = Array(this.rows).fill().map(() => Array(this.columns).fill(null));

    const fillRemainingSymbols = () => {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.columns; col++) {
          if (!grid[row][col]) {
            grid[row][col] = this.getRandomSymbol();
          }
        }
      }
    };

    if (random < 0.3) {
      // 0.3% chance - Todas as posições com o mesmo ícone
      const symbol = this.getRandomSymbol();
      grid = grid.map(row => row.map(() => symbol));
    } else if (random < 2) {
      // 5.7% chance - Uma coluna e uma linha com o mesmo ícone
      const symbol = this.getRandomSymbol();
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomColumn = Math.floor(Math.random() * this.columns);

      grid[randomRow].fill(symbol);
      grid.forEach(row => row[randomColumn] = symbol);
    } else if (random < 5) {
      // 14% chance - Uma linha inteira com o mesmo ícone
      const symbol = this.getRandomSymbol();
      const randomRow = Math.floor(Math.random() * this.rows);
      grid[randomRow].fill(symbol);
    } else if (random < 8) {
      // 16% chance - Uma coluna inteira com o mesmo ícone
      const symbol = this.getRandomSymbol();
      const randomColumn = Math.floor(Math.random() * this.columns);
      grid.forEach(row => row[randomColumn] = symbol);
    } else if (random < 11) {
      // 25% chance - Quatro ícones na linha
      const symbol = this.getRandomSymbol();
      const randomRow = Math.floor(Math.random() * this.rows);
      grid[randomRow].fill(symbol, 0, 4);
    } else if (random < 22) {
      // 36% chance - Três ícones na linha
      const symbol = this.getRandomSymbol();
      const randomRow = Math.floor(Math.random() * this.rows);
      grid[randomRow].fill(symbol, 0, 3);
    } else {
      // 3% chance - Nenhuma combinação vencedora
      grid = grid.map(row => row.map(() => this.getRandomSymbol()));
    }

    fillRemainingSymbols();
    return grid;
  }
  spin() {
    return this.generateSpinResult();
  }
  getRandomSymbol() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  // spin() {
  //   let grid = [];
  //   for (let i = 0; i < this.rows; i++) {
  //     let row = [];
  //     for (let j = 0; j < this.columns; j++) {
  //       row.push(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
  //     }
  //     grid.push(row);
  //   }
  //   return grid;
  // }

   checkWin(reels, betAmount) {
    let totalWin = 0;

    // Verificação das linhas de pagamento regulares com suporte a Wild
    this.paylines.forEach((payline) => {
      let symbolsOnPayline = payline.map(([row, col]) => reels[row][col]);
      let count = 1;
      let lastSymbol = null;

      for (let symbol of symbolsOnPayline) {
        if (symbol === this.wildSymbol || symbol === lastSymbol) {
          count++;
        } else {
          if (lastSymbol && this.paytable[lastSymbol] && this.paytable[lastSymbol][count.toString()]) {
            totalWin += this.paytable[lastSymbol][count.toString()] * betAmount;
          }
          count = 1;
        }
        lastSymbol = symbol;
      }

      // Verifica a última sequência
      if (lastSymbol && this.paytable[lastSymbol] && this.paytable[lastSymbol][count.toString()]) {
        totalWin += this.paytable[lastSymbol][count.toString()] * betAmount;
      }
    });

    // Verificação para Scatter
    let scatterCount = reels.flat().filter(symbol => symbol === this.scatterSymbol).length;
    if (scatterCount >= 3) {
      totalWin += (this.paytable[this.scatterSymbol][scatterCount.toString()] || 0) * betAmount;
    }

    return totalWin;
  }

  
  

  checkLineWin(line) {
    let winAmount = 0;
    for (let i = 0; i <= line.length - 3; i++) {
      for (let length of [3, 4, 5]) {
        if (i + length <= line.length) {
          let subLine = line.slice(i, i + length);
          let pattern = this.createPattern(subLine);
          if (pattern in this.paytable) {
            let outcome = this.paytable[pattern];
            winAmount += outcome.win ? outcome.win : 0;
            break;
          }
        }
      }
    }
    return winAmount;
  }

  createPattern(line) {
    let wildCount = line.filter((symbol) => symbol === this.wildSymbol).length;
    let scatterCount = line.filter(
      (symbol) => symbol === this.scatterSymbol
    ).length;

    if (scatterCount > 0) {
      return "SCATTER";
    } else if (wildCount === line.length) {
      return "WILD";
    } else if (wildCount > 0) {
      return line
        .map((symbol) => (symbol === this.wildSymbol ? "WILD" : symbol))
        .join("");
    } else {
      return line.join("");
    }
  }
}

export default SlotMachine;
