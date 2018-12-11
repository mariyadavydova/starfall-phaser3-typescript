import "phaser"

export class GameScene extends Phaser.Scene {
  sand: Phaser.Physics.Arcade.StaticGroup;
  lastStarTime: number;
  info: Phaser.GameObjects.Text;
  starsCaught: number;
  starsFallen: number;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.image("star", "assets/star.png");
    this.load.image("sand", "assets/sand.jpg");
  }

  create(): void {
    this.starsCaught = 0;
    this.starsFallen = 0;

    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });
    Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
      new Phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();

    this.lastStarTime = 0;
    this.info = this.add.text(10, 10, '',
      { font: '24px Arial Bold', fill: '#ffffff' });

  }

  update(time): void {
    var diff = time - this.lastStarTime;
    if (diff > 1000) {
      this.lastStarTime = time;
      this.emitStar();
    }
    this.info.text =
      this.starsCaught + " caught - " +
      this.starsFallen + " fallen";
  }

  private emitStar(): Phaser.Physics.Arcade.Image {
    var star: Phaser.Physics.Arcade.Image;
    var x = Phaser.Math.Between(25, 775);
    var y = 26;
    star = this.physics.add.image(x, y, "star");

    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    star.setInteractive();

    var scene: GameScene = this;

    star.on('pointerdown', function () {
      star.setTint(0x00ff00);
      star.setVelocity(0, 0);
      scene.starsCaught += 1;
      scene.time.delayedCall(100, function (star) {
        star.destroy();
      }, [star], scene)
    });

    this.physics.add.collider(star, this.sand, function () {
      star.setTint(0xff0000);
      scene.starsFallen += 1;
      scene.time.delayedCall(100, function (star) {
        star.destroy();
      }, [star], scene)
    });

    return star;
  }
}
