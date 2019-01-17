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
    this.title = this.add.text(150, 200, titleText,
      { font: '128px Arial Bold', fill: '#FBFBAC' });

    var hintText: string = "Click to start";
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' });

    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("GameScene");
    }, this);
  }
};
