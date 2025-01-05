import { Brick } from './brick';
import { GameBrick } from './game-brick';

export class Board {
  readonly boardLength = 20;
  readonly boardWidth = 10;

  movingBricks: Map<string, Brick> = new Map();
  settledBricks: Brick[] = [];

  bricks: Brick[] = [];

  constructor() {
    this.initBoard();
  }

  addTetramino(x: number, y: number, color: string): void {
    const tetramino = this.createSingleBrick(x, y, color);
    if (tetramino) {
      this.movingBricks.set(this.getBrickId(tetramino), tetramino);
    }
  }

  createSingleBrick(x: number, y: number, color: string): Brick | undefined {
    const gameBrick = this.bricks.find(brick => brick.getX() === x && brick.getY() === y);
    gameBrick?.mark(color);
    if (gameBrick) {
      this.movingBricks.set(this.getBrickId(gameBrick), gameBrick);
    }
    return gameBrick;
  }

  getBricks(): Brick[] {
    return this.bricks;
  }

  moveY(): void {
    const aaa = [];
    for (let [key, movingItem] of this.movingBricks) {
      const newBrick = this.bricks.find(item => item.getX() === movingItem.getX() && item.getY() === movingItem.getY() + 1);
      console.log('Pos x --> ', newBrick?.getX());
      console.log('Pos y --> ', newBrick?.getY());
      if (newBrick) {
        this.unsetSingleBrick(movingItem);
        // this.movingBricks.set(this.getBrickId(newBrick), newBrick);
        // newBrick.mark('blue');
        aaa.push(newBrick);
      }
    }

    aaa.forEach(newItem => {
      this.movingBricks.set(this.getBrickId(newItem), newItem);
      newItem.mark('blue');
    });
  }

  moveXLeft(): void {

  }


  moveXRight(): void {

  }

  private getBrickId(brick: Brick): string {
    return brick.getX() + '-' + brick.getY();
  }

  private initBoard(): void {
    for (let j = 0; j < this.boardLength; j++) {
      for (let i = 0; i < this.boardWidth; i++) {
        this.bricks.push(new Brick(i, j));
      }
    }
  }

  private unsetSingleBrick(activeBrick: Brick): void {
    setTimeout(() => {
      activeBrick.clear();
      this.movingBricks.delete(this.getBrickId(activeBrick));
    }, 1000);
    // this.movingBricks = this.movingBricks.filter(brick => {
    //   return brick.getX() !== activeBrick.getX() && brick.getY() !== activeBrick.getY();
    // });
  }
}
