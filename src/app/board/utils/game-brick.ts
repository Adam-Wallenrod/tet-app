import { Brick } from './brick';

export class GameBrick extends Brick {

  moveX(): number {
    this.x++;
    return this.x;
  }

  moveY(): number {
    this.y++;
    return this.y;
  }

}
