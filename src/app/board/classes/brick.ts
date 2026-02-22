export enum BrickType {
  MOVING = 'Moving',
  SETTLED = 'Setting',
  DEFAULT = 'Default',
}

export enum DirectionX {
  LEFT = 'Left',
  RIGHT = 'Right',
}

export class Brick {
  private color: string = 'white';

  private isMoving: boolean = false;

  private isSettled: boolean = false;

  protected x: number;

  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getColor(): string {
    return this.color;
  }


  getX(): number {
    return this.x;
  }


  getY(): number {
    return this.y;
  }

  mark(color: string, type: BrickType = BrickType.DEFAULT): void {
    this.color = color;
    switch (type) {
      case BrickType.MOVING:
        this.isMoving = true;
        break;
      case BrickType.SETTLED:
        this.isSettled = true;
        break;
    }
    this.isMoving = true;
  }


  clear(): void {
    this.color = 'white';
    this.isMoving = false;
    this.isSettled = false;
  }
}
