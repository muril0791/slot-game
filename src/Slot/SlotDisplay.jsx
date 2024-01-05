import React, { Component } from "react";
import * as PIXI from "pixi.js";
import "./SlotDisplay.css";

class SlotDisplay extends Component {
  constructor(props) {
    super(props);
    this.pixiContainer = React.createRef();
    this.app = null;
    this.columns = [];
    this.spinning = false;
    this.rowHeight = 0;
  }

  componentDidMount() {
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      transparent: true,
    });
    this.pixiContainer.current.appendChild(this.app.view);
    this.createSlotMachine();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSpinning && !prevProps.isSpinning) {
      this.startSpinning();
    } else if (!this.props.isSpinning && prevProps.isSpinning) {
      this.updateSymbols();
    }

    if (this.props.winningSymbols !== prevProps.winningSymbols) {
      this.animateWinningSymbols(this.props.winningSymbols);
    }
  }
  createSlotMachine() {
    const { width, height } = this.app.renderer;
    const margin = 20;
    const columnWidth = (width - margin * (5 + 1)) / 5;
    this.rowHeight = (height - margin * (3 + 1)) / 3;

    this.columns = [];

    for (let i = 0; i < 5; i++) {
      const column = new PIXI.Container();
      column.x = margin + i * (columnWidth + margin);
      this.app.stage.addChild(column);
      this.columns.push(column);

      for (let j = 0; j < 3; j++) {
        const symbolText = new PIXI.Text(
          this.props.symbols[
            Math.floor(Math.random() * this.props.symbols.length)
          ],
          {
            fontFamily: "Arial",
            fontSize: 88,
            fill: 0xffffff,
            align: "center",
          }
        );
        symbolText.anchor.set(0.5);
        symbolText.x = columnWidth / 2;
        symbolText.y = j * this.rowHeight + this.rowHeight / 2;
        column.addChild(symbolText);
      }
    }
  }
  animateWinningSymbols(winningSymbols) {
    const pulseAnimation = (symbol) => {
      const speed = 200; // Valor menor que 500 para aumentar a velocidade
      symbol.scale.x = 1.2 + Math.sin(new Date().getTime() / speed) * 0.2;
      symbol.scale.y = 1.2 + Math.sin(new Date().getTime() / speed) * 0.2;
    };

    this.columns.forEach((column, columnIndex) => {
      column.children.forEach((symbol, rowIndex) => {
        const isWinningSymbol = winningSymbols.some(
          (pos) => pos[0] === columnIndex && pos[1] === rowIndex
        );
        if (isWinningSymbol) {
          pulseAnimation(symbol);
        } else {
          symbol.scale.x = 1.0;
          symbol.scale.y = 1.0;
        }
      });
    });

    if (!this.props.isSpinning) {
      requestAnimationFrame(() => this.animateWinningSymbols(winningSymbols));
    }
  }

  startSpinning() {
    const { animationSpeed } = this.props;
    this.spinning = true;
    const spinSpeed = 15 * animationSpeed;
    const spinCount = 7; // Número de voltas completas antes de parar
    this.spinning = true;

    this.columns.forEach((column) => {
      let currentSpin = 0;
      const spinAnimation = () => {
        if (this.spinning && currentSpin < spinCount) {
          column.children.forEach((symbol) => {
            symbol.y += spinSpeed;
            if (symbol.y > this.rowHeight * 3) {
              symbol.y = -this.rowHeight;
              currentSpin++;
            }
          });
          requestAnimationFrame(spinAnimation);
        } else {
          this.spinning = false;
          this.resetSymbolPositions(column); // Reposiciona os símbolos
        }
      };
      requestAnimationFrame(spinAnimation);
    });
  }

  resetSymbolPositions(column) {
    column.children.forEach((symbol, index) => {
      symbol.y = index * this.rowHeight + this.rowHeight / 2;
    });
  }

  updateSymbols() {
    const newResults = this.props.results;

    if (
      !newResults ||
      newResults.length !== 5 ||
      newResults.some((column) => !column || column.length !== 3)
    ) {
      console.error(
        "newResults is undefined or not in the correct structure",
        newResults
      );
      return;
    }

    this.columns.forEach((column, columnIndex) => {
      column.removeChildren();

      newResults[columnIndex].forEach((symbol, rowIndex) => {
        const symbolText = new PIXI.Text(symbol, {
          fontFamily: "Arial",
          fontSize: 88,
          fill: 0xffffff,
          align: "center",
        });
        symbolText.anchor.set(0.5);
        symbolText.x = 136 / 2;
        symbolText.y = rowIndex * this.rowHeight + this.rowHeight / 2;
        column.addChild(symbolText);
      });
    });
  }

  componentWillUnmount() {
    this.app.stop();
    this.pixiContainer.current.removeChild(this.app.view);
  }

  render() {
    return (
      <div className="slotMachine">
        <div ref={this.pixiContainer} className="pixi-container" />
      </div>
    );
  }
}

export default SlotDisplay;
