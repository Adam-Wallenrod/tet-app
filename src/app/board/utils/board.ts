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

  getBricks(): Brick[] {
    return this.bricks;
  }

  private initBoard(): void {
    for (let j = 0; j < this.boardLength; j++) {
      for (let i = 0; i < this.boardWidth; i++) {
        this.bricks.push(new Brick(i, j));
      }
    }
  }
}
