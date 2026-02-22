import {Brick, DirectionX} from './brick';


export class GameBrick extends Brick {
  constructor(x: number, y: number, color: string) {
    super(x, y);
    this.mark(color);
  }

  moveX (direction: DirectionX): number {
    if (direction === DirectionX.LEFT) {
      this.x--;
    }

    if (direction === DirectionX.RIGHT) {
      this.x++;
    }
    return this.x;
  }

  moveY(): number {
    this.y++;
    return this.y;
  }

}
