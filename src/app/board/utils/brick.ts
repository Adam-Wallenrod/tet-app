export class Brick {
  private color: string = 'white';

  private isFilled: boolean = false;

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

  mark(color: string): void {
    this.color = color;
    this.isFilled = true;
  }


  clear(): void {
    this.color = 'white';
    this.isFilled = false;
  }
}
