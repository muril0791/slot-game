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

  spin() {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
      }
      grid.push(row);
    }
    return grid;
  }

  checkWin(reels) {
    let totalWin = 0;
    this.paylines.forEach((payline) => {
      let symbolsOnPayline = payline.map((rowIndex, colIndex) => reels[rowIndex][colIndex]);
      let count = 1;
      let lastSymbol = null;

      for (let symbol of symbolsOnPayline) {
        if (symbol === lastSymbol) {
          count++;
        } else {
          if (lastSymbol && this.paytable[lastSymbol] && this.paytable[lastSymbol][count.toString()]) {
            totalWin += this.paytable[lastSymbol][count.toString()];
          }
          count = 1;
        }
        lastSymbol = symbol;
      }

      // Verifica a última sequência
      if (lastSymbol && this.paytable[lastSymbol] && this.paytable[lastSymbol][count.toString()]) {
        totalWin += this.paytable[lastSymbol][count.toString()];
      }
    });

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
    let wildCount = line.filter(symbol => symbol === this.wildSymbol).length;
    let scatterCount = line.filter(symbol => symbol === this.scatterSymbol).length;

    if (scatterCount > 0) {
      return 'SCATTER';
    } else if (wildCount === line.length) {
      return 'WILD';
    } else if (wildCount > 0) {
      return line.map(symbol => symbol === this.wildSymbol ? 'WILD' : symbol).join('');
    } else {
      return line.join('');
    }
  }
}

export default SlotMachine;
