import "phaser";

export class WelcomeScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "WelcomeScene"
    });
  }

  create(): void {
    var titleText: string = "Starfall";
    this.title = this.add.text(300, 250, titleText,
      { font: '48px Arial Bold', fill: '#ffffff' });

    var hintText: string = "Click anywhere to restart";
    this.hint = this.add.text(300, 350, hintText,
      { font: '16px Arial Bold', fill: '#ffffff' });

    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("GameScene");
    }, this);
  }
};
