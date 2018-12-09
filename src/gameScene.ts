import "phaser"

export class GameScene extends Phaser.Scene {
  stars: Phaser.Physics.Arcade.Image[];
  sand: Phaser.Physics.Arcade.Image;
  lastStarTime: number;
  scoreCaught: number;
  scoreFallen: number;
  info: Phaser.GameObjects.Text;


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
    this.stars = [];
    this.sand = this.physics.add.image(400, 580, "sand");
    this.sand.setDisplaySize(800, 40);
    this.sand.body.immovable = true;
    this.lastStarTime = 0;
    this.scoreCaught = 0;
    this.scoreFallen = 0;
    this.info = this.add.text(10, 10, '',
      { font: '24px Arial Bold', fill: '#ffffff' });

  }

  update(time): void {
    var diff = time - this.lastStarTime;
    if (diff > 1000) {
      this.lastStarTime = time;
      this.stars.push(this.emitStar());
    }
    this.info.text = "Score: " +
      this.scoreCaught + " caught, " +
      this.scoreFallen + " fallen.";
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
      scene.scoreCaught += 1;
      scene.time.delayedCall(100, function (star) {
        star.destroy();
      }, [star], scene)
    });

    this.physics.add.collider(star, this.sand, function () {
      star.setTint(0xff0000);
      scene.scoreFallen += 1;
      scene.time.delayedCall(100, function (star) {
        star.destroy();
      }, [star], scene)
    });
    return star;
  }
}
