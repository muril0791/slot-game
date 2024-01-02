class SlotMachine {
  constructor(symbols, paytable, paylines, wildSymbol, rows = 3, columns = 5) {
    this.symbols = symbols;
    this.paytable = paytable;
    this.paylines = paylines;
    this.wildSymbol = wildSymbol;
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
    if (!reels || !this.paylines) {
      console.error("reels or paylines are undefined");
      return 0;
    }

    let totalWin = 0;
    this.paylines.forEach((payline) => {
      let symbolsOnPayline = payline.map((rowIndex, colIndex) => reels[colIndex][rowIndex]);
      let uniqueSymbols = new Set(symbolsOnPayline);
      if (uniqueSymbols.size === 1 || (uniqueSymbols.size === 2 && uniqueSymbols.has(this.wildSymbol))) {
        let symbol = uniqueSymbols.has(this.wildSymbol)
          ? [...uniqueSymbols].filter((s) => s !== this.wildSymbol)[0]
          : uniqueSymbols.values().next().value;
        totalWin += this.paytable[symbol] * (uniqueSymbols.has(this.wildSymbol) ? 2 : 1);
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
            winAmount += this.paytable[pattern];
            break;
          }
        }
      }
    }
    return winAmount;
  }

  createPattern(subLine) {
    let wildCount = subLine.filter(
      (symbol) => symbol === this.wildSymbol
    ).length;
    let pattern = subLine
      .map((symbol) => (symbol === this.wildSymbol ? this.wildSymbol : "X"))
      .join("");

    if (wildCount > 0 && wildCount < subLine.length) {
      pattern =
        Array(subLine.length).fill("W").join("").slice(0, wildCount) +
        Array(subLine.length)
          .fill("X")
          .join("")
          .slice(0, subLine.length - wildCount);
    }
    return pattern;
  }
}

export default SlotMachine;
