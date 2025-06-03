// src/Slot/SlotDisplay.jsx

import React, { Component } from "react";
import * as PIXI from "pixi.js";
import symbolMap from "../assets/symbol-icon/symbolMap";
import frameImage from "../assets/slot-background-frame.png";
import "./SlotDisplay.css";

export default class SlotDisplay extends Component {
  constructor(props) {
    super(props);
    this.pixiContainer = React.createRef();
    this.app = null;
    this.columns = [];
    this.spritePool = [];
    this.columnWidth = 0;
    this.rowHeight = 0;
    this.frameIds = [];
    this.winFrameId = null;
    this.bgSprite = null;
    this.resizeTimeout = null;
    this.textures = {};
  }

  componentDidMount() {
    const container = this.pixiContainer.current;
    const initWidth = container.clientWidth;
    const initHeight = container.clientHeight;

    this.app = new PIXI.Application({
      width: initWidth,
      height: initHeight,
      transparent: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    container.appendChild(this.app.view);
    window.addEventListener("resize", this.handleWindowResize);

    this.textures.frame = PIXI.Texture.from(frameImage);
    Object.entries(symbolMap).forEach(([key, path]) => {
      this.textures[key] = PIXI.Texture.from(path);
    });

    this.bgSprite = new PIXI.Sprite(this.textures.frame);
    this.bgSprite.anchor.set(0, 0);
    this.app.stage.addChild(this.bgSprite);
    this.createSlotMachine();
    this.onResize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSpinning && !prevProps.isSpinning) {
      this.startSpinning();
    } else if (!this.props.isSpinning && prevProps.isSpinning) {
      this.updateSymbols();
    }
    if (
      JSON.stringify(prevProps.winningSymbols) !==
        JSON.stringify(this.props.winningSymbols) &&
      Array.isArray(this.props.winningSymbols) &&
      this.props.winningSymbols.length > 0
    ) {
      this.animateWinningSymbols(this.props.winningSymbols);
    }
    if (
      Array.isArray(prevProps.winningSymbols) &&
      prevProps.winningSymbols.length > 0 &&
      Array.isArray(this.props.winningSymbols) &&
      this.props.winningSymbols.length === 0
    ) {
      this.resetAllScalesToBase();
      if (this.winFrameId) {
        cancelAnimationFrame(this.winFrameId);
        this.winFrameId = null;
      }
    }
  }

  componentWillUnmount() {
    this.frameIds.forEach((id) => cancelAnimationFrame(id));
    if (this.winFrameId) cancelAnimationFrame(this.winFrameId);
    window.removeEventListener("resize", this.handleWindowResize);
    if (this.app) {
      this.app.stop();
      this.pixiContainer.current.removeChild(this.app.view);
    }
  }

  handleWindowResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const container = this.pixiContainer.current;
      if (!container || !this.app) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      this.app.renderer.resize(newWidth, newHeight);
      this.onResize();
    }, 100);
  };

  onResize() {
    if (!this.app) return;
    const r = this.app.renderer.resolution;
    const w = this.app.renderer.width / r;
    const h = this.app.renderer.height / r;

    this.bgSprite.width = w;
    this.bgSprite.height = h;
    this.bgSprite.position.set(0, 0);

    const borderX = w * 0.10;
    const borderY = h * 0.10;

    this.columnWidth = (w - 2 * borderX) / 6;
    this.rowHeight = (h - 2 * borderY) / 3.5;

    this.columns.forEach((colContainer, colIdx) => {
      colContainer.x = borderX + colIdx * this.columnWidth;
      colContainer.y = borderY;
      for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        const sprite = this.spritePool[colIdx][rowIdx];
        sprite.width = this.columnWidth * 0.4;
        sprite.height = this.rowHeight * 0.4;
        sprite.anchor.set(0.5, 0.5);
        sprite.x = this.columnWidth / 2;
        sprite.y = rowIdx * this.rowHeight + this.rowHeight / 2;
        sprite.baseScale = { x: sprite.scale.x, y: sprite.scale.y };
      }
    });
  }

  createSlotMachine() {
    this.columns = [];
    this.spritePool = [];
    for (let col = 0; col < 5; col++) {
      const container = new PIXI.Container();
      this.app.stage.addChild(container);
      this.columns.push(container);
      this.spritePool[col] = [];
      for (let row = 0; row < 3; row++) {
        const randomName =
          this.props.symbols[
            Math.floor(Math.random() * this.props.symbols.length)
          ];
        let sprite;
        if (this.textures[randomName]) {
          sprite = new PIXI.Sprite(this.textures[randomName]);
        } else {
          sprite = new PIXI.Text(randomName, {
            fontFamily: "Arial",
            fontSize: 88,
            fill: 0xffffff,
            align: "center",
          });
        }
        sprite.anchor.set(0.5, 0.5);
        container.addChild(sprite);
        this.spritePool[col][row] = sprite;
      }
    }
  }

  startSpinning() {
    const baseSpeedPxPerMs = 1.2 * this.props.animationSpeed;
    this.frameIds.forEach((id) => cancelAnimationFrame(id));
    this.frameIds = [];
    this.columns.forEach((colContainer, colIdx) => {
      let previousTime = performance.now();
      const spinLoop = (currentTime) => {
        if (!this.props.isSpinning) {
          cancelAnimationFrame(this.frameIds[colIdx]);
          return;
        }
        const delta = currentTime - previousTime;
        previousTime = currentTime;
        const moveBy = baseSpeedPxPerMs * delta;
        this.spritePool[colIdx].forEach((sprite) => {
          sprite.y += moveBy;
          if (sprite.y > this.rowHeight * 3 + this.rowHeight / 2) {
            sprite.y -= this.rowHeight * 3;
          }
        });
        this.frameIds[colIdx] = requestAnimationFrame(spinLoop);
      };
      this.frameIds[colIdx] = requestAnimationFrame(spinLoop);
    });
  }

  updateSymbols() {
    const newResults = this.props.results;
    if (
      !newResults ||
      newResults.length !== 3 ||
      newResults.some((row) => row.length !== 5)
    ) {
      return;
    }
    this.columns.forEach((colContainer, colIdx) => {
      for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        const name = newResults[rowIdx][colIdx];
        const sprite = this.spritePool[colIdx][rowIdx];
        if (this.textures[name]) {
          sprite.texture = this.textures[name];
        } else {
          sprite.texture = null;
          sprite.text = name;
        }
      }
    });
    this.onResize();
  }

  animateWinningSymbols(winningSymbols) {
    this.resetAllScalesToBase();
    const pulseLoop = () => {
      if (this.props.isSpinning) return;
      const now = Date.now();
      const pulseSpeed = 200;
      this.columns.forEach((colContainer, colIdx) => {
        this.spritePool[colIdx].forEach((sprite, rowIdx) => {
          const isWinner = winningSymbols.some(
            ([winRow, winCol]) => winRow === rowIdx && winCol === colIdx
          );
          if (isWinner) {
            const factor = 1 + Math.sin(now / pulseSpeed) * 0.2;
            sprite.scale.set(sprite.baseScale.x * factor, sprite.baseScale.y * factor);
          } else {
            sprite.scale.set(sprite.baseScale.x, sprite.baseScale.y);
          }
        });
      });
      this.winFrameId = requestAnimationFrame(pulseLoop);
    };
    this.winFrameId = requestAnimationFrame(pulseLoop);
  }

  resetAllScalesToBase() {
    this.columns.forEach((colContainer, colIdx) => {
      this.spritePool[colIdx].forEach((sprite) => {
        sprite.scale.set(sprite.baseScale.x, sprite.baseScale.y);
      });
    });
  }

  render() {
    return (
      <div className="slotMachine">
        <div ref={this.pixiContainer} className="pixi-container" />
      </div>
    );
  }
}
