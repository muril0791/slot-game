export default class SlotMachine {
    constructor(symbols, paytable, wildSymbol, rows = 5, columns = 3) {
        this.symbols = symbols;
        this.paytable = paytable;
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

    checkWin(grid) {
        let totalWin = 0;
        for (let row of grid) {
            totalWin += this.checkLineWin(row);
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
                        winAmount += this.paytable[pattern];
                        break;
                    }
                }
            }
        }
        return winAmount;
    }

    createPattern(subLine) {
        let wildCount = subLine.filter(symbol => symbol === this.wildSymbol).length;
        let pattern = subLine.map(symbol => symbol === this.wildSymbol ? this.wildSymbol : 'X').join('');
        
        if (wildCount > 0 && wildCount < subLine.length) {
            pattern = Array(subLine.length).fill('W').join('').slice(0, wildCount) + Array(subLine.length).fill('X').join('').slice(0, subLine.length - wildCount);
        }
        return pattern;
    }
}
