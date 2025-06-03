// src/math/SlotMachine.js

class SlotMachine {
  constructor(symbols, paytable, paylines, wildSymbol = null, scatterSymbol = null, rows = 3, columns = 5) {
    this.symbols = symbols;       // ex.: ["cherries","lemon","bell",...]
    this.paytable = paytable;     // objeto importado de payTables.js
    this.paylines = paylines;     // array de payLines
    this.wildSymbol = wildSymbol; // se tiver curinga
    this.scatterSymbol = scatterSymbol; // se tiver scatter
    this.rows = rows;
    this.columns = columns;
  }

  // Gera um resultado aleatório (grid 3×5) de strings (nomes de símbolos)
  // A lógica a seguir tem probabilidade de padrões especiais (jackpot)
  generateSpinResult(forceFlag = null) {
    // Exemplo de “forçar vitória”: se forceFlag === true, preenche tudo com “jackpot”
    if (forceFlag === true) {
      return Array.from({ length: this.rows }, () =>
        Array.from({ length: this.columns }, () => "jackpot")
      );
    }
    // Se for “forceFlag === false”, retorna completamente aleatório sem chance de jackpot
    if (forceFlag === false) {
      return Array.from({ length: this.rows }, () =>
        Array.from({ length: this.columns }, () => this.getRandomSymbol())
      );
    }

    // Lógica normal: usada probabilidade para jackpot completo, linha cheia, etc.
    const random = Math.random() * 100;
    let grid = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(null)
    );

    const fillRemaining = () => {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          if (!grid[r][c]) {
            grid[r][c] = this.getRandomSymbol();
          }
        }
      }
    };

    if (random < 0.5) {
      // Jackpot completo (0.5% de chance)
      const symbol = "jackpot";
      grid = grid.map((row) => row.map(() => symbol));
    } else if (random < 2) {
      // Linha e coluna cheia com o mesmo símbolo
      const symbol = this.getRandomSymbol();
      const randRow = Math.floor(Math.random() * this.rows);
      const randCol = Math.floor(Math.random() * this.columns);
      grid[randRow].fill(symbol);
      grid.forEach((row) => (row[randCol] = symbol));
    } else if (random < 5) {
      // Linha cheia (3 colunas)
      const symbol = this.getRandomSymbol();
      const randRow = Math.floor(Math.random() * this.rows);
      grid[randRow].fill(symbol);
    } else if (random < 8) {
      // Coluna cheia
      const symbol = this.getRandomSymbol();
      const randCol = Math.floor(Math.random() * this.columns);
      grid.forEach((row) => (row[randCol] = symbol));
    } else if (random < 12) {
      // 4 símbolos na mesma linha
      const symbol = this.getRandomSymbol();
      const randRow = Math.floor(Math.random() * this.rows);
      grid[randRow].fill(symbol, 0, 4);
    } else if (random < 22) {
      // 3 símbolos na mesma linha
      const symbol = this.getRandomSymbol();
      const randRow = Math.floor(Math.random() * this.rows);
      grid[randRow].fill(symbol, 0, 3);
    } else {
      // 100% aleatório
      grid = grid.map((row) =>
        row.map(() => this.getRandomSymbol())
      );
    }

    fillRemaining();
    return grid;
  }

  spin(forceFlag = null) {
    return this.generateSpinResult(forceFlag);
  }

  getRandomSymbol() {
    // Retorna um nome de símbolo aleatório do array this.symbols
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  // Verifica combinações vencedoras em cada payline
  checkWin(reels, betAmount) {
    let totalWin = 0;
    let winningSymbols = [];

    this.paylines.forEach((payline) => {
      // Extrai os símbolos na payline: array de strings
      const symbolsOnLine = payline.map(([row, col]) => reels[row][col]);
      let count = 1;
      let lastSymbol = symbolsOnLine[0];
      let positions = [payline[0]];

      for (let i = 1; i < symbolsOnLine.length; i++) {
        const symbol = symbolsOnLine[i];
        if (symbol === lastSymbol) {
          count++;
          positions.push(payline[i]);
        } else {
          // Se existe entrada em this.paytable[lastSymbol][count]
          if (
            this.paytable[lastSymbol] &&
            this.paytable[lastSymbol][count]
          ) {
            totalWin += this.paytable[lastSymbol][count] * betAmount;
            winningSymbols.push(...positions);
          }
          count = 1;
          positions = [payline[i]];
        }
        lastSymbol = symbol;
      }

      // Última sequência
      if (
        this.paytable[lastSymbol] &&
        this.paytable[lastSymbol][count]
      ) {
        totalWin += this.paytable[lastSymbol][count] * betAmount;
        winningSymbols.push(...positions);
      }
    });

    return { totalWin, winningSymbols };
  }
}

export default SlotMachine;
