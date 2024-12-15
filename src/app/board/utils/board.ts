import { Brick } from './brick';
import { GameBrick } from './game-brick';

export class Board {
  readonly boardLength = 20;
  readonly boardWidth = 10;

  currentTetramino: GameBrick | undefined = undefined;

  movingBricks: Brick[] = [];
  settledBricks: Brick[] = [];

  bricks: Brick[] = [];

  constructor() {
    this.initBoard();

  }

  addTetramino(x: number, y: number, color: string): Brick[] {
    const tetramino = this.createSingleBrick(x, y, color);
    if(tetramino) {
      this.movingBricks.push(tetramino);
    }
    return this.movingBricks;
  }

  createSingleBrick(x: number, y: number, color: string): Brick | undefined {
    const gameBrick = this.bricks.find(brick => brick.getX() === x && brick.getY());
    gameBrick?.mark('blue');
    // if(gameBrick) {
    //   this.movingBricks.push(gameBrick);
    // }
    return gameBrick;
  }

  getBricks(): Brick[] {
    return this.bricks;
  }

  moveY(): void {
    this.movingBricks.map(item => item.clear());
  }

  moveXLeft(): void {

  }


  moveXRight(): void {


  }

  private initBoard(): void {
    for (let j = 0; j < this.boardLength; j++) {
      for (let i = 0; i < this.boardWidth; i++) {
        this.bricks.push(new Brick(i, j));
      }
    }
  }
}
