import "phaser";

const config: GameConfig = {
  title: "TicTacToe",
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  input: {
    keyboard: false,
    mouse: true,
    touch: false,
    gamepad: false
  },
  backgroundColor: "#000055"
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
