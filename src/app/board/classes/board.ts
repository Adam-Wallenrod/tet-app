import { Brick, BrickType, DirectionX } from './brick';

export class Board {
  readonly boardLength = 20;
  readonly boardWidth = 10;

  movingBricks: Map<string, Brick> = new Map();
  settledBricks: Map<string, Brick> = new Map();

  bricks: Brick[] = [];
  tetraminoBricks: Map<string, Brick> = new Map();

  constructor() {
    this.initBoard();
  }

  //TODO: change name to addToMovingTetramino ???
  addTetramino(x: number, y: number, color: string): void {
    const tetramino = this.createSingleBrick(x, y, color);
    if (tetramino) {
      this.movingBricks.set(this.getBrickId(tetramino), tetramino);
    }
  }

  addMovingTetramino(tetramino: Brick): void {
    tetramino.mark('blue', BrickType.MOVING);
    this.movingBricks.set(this.getBrickId(tetramino), tetramino);
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
    const initTetraCounter = this.settledBricks.size;
    let tetraCounter = initTetraCounter;
    //console.log('this.bricks', this.bricks);
    //TODO: looks like not using moveX and moveY from Brick class at all!!!
    for (let [key, movingItem] of this.movingBricks) {
      //console.log('movingItem', movingItem);
      const newBrick = this.bricks.find(item => {
        return !this.hasBrickAtCoordinates(item) &&
        item.getX() === movingItem.getX() && item.getY() === movingItem.getY() + 1
      });
      // console.log('Pos x --> ', newBrick?.getX());
      // console.log('Pos y --> ', newBrick?.getY());
      if (newBrick) {
        this.unsetSingleBrick(movingItem);
        if (this.hasBrickAtCoordinates(newBrick) || newBrick.getY() === this.boardLength - 1) {
          // this.settledBricks.set(this.getBrickId(newBrick), newBrick);
          this.settleBrick(newBrick);
          tetraCounter = initTetraCounter + 4;
        } else {
          updatedMovingBricks.push(newBrick);
        }
      } else {
        this.unsetSingleBrick(movingItem);
        this.settleBrick(movingItem);
      }
    }

    if (tetraCounter === initTetraCounter) {
      updatedMovingBricks.forEach(newItem => {
        this.movingBricks.set(this.getBrickId(newItem), newItem);
        newItem.mark('blue', BrickType.MOVING);
      });
    }
  }

  moveX(direction: DirectionX): void {
    const newMovingBricks: Brick[] = [];
    for (let [key, movingItem] of this.movingBricks) {
      const moveStep: number = direction === DirectionX.LEFT ? -1 : 1;
      const newBrick = this.bricks.find(item => {
        return !this.hasBrickAtCoordinates(item) && item.getY() === movingItem.getY()
          && item.getX() === movingItem.getX() + moveStep;
      });
      if (newBrick) {
        this.unsetSingleBrick(movingItem);
        //replace with separate function ???
        newMovingBricks.push(newBrick);
      }
    }
    //need to start think about real tetraminos
    for (let movingItem of newMovingBricks) {
      this.addMovingTetramino(movingItem);
    }
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

  private settleBrick(brick: Brick): void {
    this.settledBricks.set(this.getBrickId(brick), brick);
    brick.mark('red', BrickType.SETTLED);
  }

  private unsetSingleBrick(activeBrick: Brick): void {
    activeBrick.clear();
    this.movingBricks.delete(this.getBrickId(activeBrick));
  }

  //TODO: consider using a better name
  private hasBrickAtCoordinates(brickToCheck: Brick): boolean {
    return this.settledBricks.has(this.getBrickId(brickToCheck));
  }

  private isBottomReached(brick: Brick): boolean {
    return false;
  }

  private isLeftLimitReached(brick: Brick): boolean {
    return brick.getX() <= 0;
  }

  private isRightLimitReached(brick: Brick): boolean {
    return brick.getX() >= (this.boardWidth - 1);
  }

  private isPositionTaken(xPos: number, yPos: number): boolean {
    return this.settledBricks.has(xPos + '-' + yPos);
  }
}
