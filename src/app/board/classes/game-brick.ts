import { Brick } from './brick';

export class GameBrick extends Brick {
  constructor(x: number, y: number, color: string) {
    super(x, y);
    this.mark(color);
  }

  moveX(): number {
    this.x++;
    return this.x;
  }

  moveY(): number {
    this.y++;
    return this.y;
  }

}
