import { Brick } from './brick';
import { GameBrick } from './game-brick';

export class Board {
  readonly boardLength = 20;
  readonly boardWidth = 10;

  movingBricks: Map<string, Brick> = new Map();
  settledBricks: Brick[] = [];

  bricks: Brick[] = [];
  tetraminoBricks: Map<string, Brick> = new Map();

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

  createTetramino(): void {

  }

  getBricks(): Brick[] {
    return this.bricks;
  }

  moveY(): void {
    const updatedMovingBricks: Brick[] = [];
    for (let [key, movingItem] of this.movingBricks) {
      const newBrick = this.bricks.find(item => item.getX() === movingItem.getX() && item.getY() === movingItem.getY() + 1);
      console.log('Pos x --> ', newBrick?.getX());
      console.log('Pos y --> ', newBrick?.getY());
      if (newBrick) {
        this.unsetSingleBrick(movingItem);
        updatedMovingBricks.push(newBrick);
      }
    }

    updatedMovingBricks.forEach(newItem => {
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
    activeBrick.clear();
    this.movingBricks.delete(this.getBrickId(activeBrick));
  }

  //TODO: how to do that???
  private isBottomReached(brick: Brick): boolean {
    return false;
  }

  private isLeftLimitReached(brick: Brick): boolean {
    return brick.getX() <= 0;
  }

  private isRightLimitReached(brick: Brick): boolean {
    return brick.getX() >= (this.boardWidth - 1);
  }
}
