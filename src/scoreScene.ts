import "phaser";

export class ScoreScene extends Phaser.Scene {
  score: number;
  result: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "ScoreScene"
    });
  }

  init(params: any): void {
    this.score = params.starsCaught;
  }

  create(): void {
    var resultText: string = 'Your score is ' + this.score + '!';
    this.result = this.add.text(200, 250, resultText,
      { font: '48px Arial Bold', fill: '#FBFBAC' });

    var hintText: string = "Click to restart";
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' });

    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("WelcomeScene");
    }, this);
  }
};
