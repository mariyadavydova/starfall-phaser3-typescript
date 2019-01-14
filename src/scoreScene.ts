import "phaser";

export class ScoreScene extends Phaser.Scene {
  score: number;
  result: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "ScoreScene"
    });
  }

  init(params: any): void {
    this.score = params.starsCaught;
  }

  create(): void {
    var text: string = 'Your score is ' + this.score + '\n' +
      'Click to restart';
    this.result = this.add.text(300, 250, text,
      { font: '24px Arial Bold', fill: '#ffffff' });
    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("WelcomeScene");
    }, this);
  }
};
