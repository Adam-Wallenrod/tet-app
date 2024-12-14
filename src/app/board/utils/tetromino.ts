import { BLOCK_TYPE } from '../board.component';

export class Tetrimino {
  private readonly _type: BLOCK_TYPE;

  x1: number = 0;
  y1: number = 0;

  x2: number = 0;
  y2: number = 0;

  x3: number = 0;
  y3: number = 0;

  x4: number = 0;
  y4: number = 0;


  constructor(type: BLOCK_TYPE) {
    this._type = type;
  }

  get type(): BLOCK_TYPE {
    return this._type;
  }

  private initPosition(type: BLOCK_TYPE): void {
    switch(type) {
      case(BLOCK_TYPE.I):
        this.initTypeI();
        break;
      case(BLOCK_TYPE.J):
        this.initTypeJ();
        break;
      case(BLOCK_TYPE.L):
        this.initTypeL();
        break;
      case(BLOCK_TYPE.O):
        this.initTypeO();
        break;
      case(BLOCK_TYPE.S):
        this.initTypeS();
        break;
      case(BLOCK_TYPE.Z):
        this.initTypeZ();
        break;
      case(BLOCK_TYPE.T):
        this.initTypeZ();
        break;
      default:
        break;
    }
  }


  /**** []
        []
        []
        []
          *****/
  private initTypeI(): void {

  }


  /**** []
        []
      [][]
      *****/
  private initTypeJ(): void {
    console.log('J');
  }

  /**** []
        []
        [][]
   *****/
  private initTypeL(): void {
    console.log('L');
  }

  /**** [][]
        [][]
            *****/
  private initTypeO(): void {
    console.log('O');
  }

  /**** [][]
      [][]
           *****/
  private initTypeS(): void {
    console.log('S');
  }

  /**** [][]
          [][]
                 *****/
  private initTypeZ(): void {
    console.log('Z');
  }


  /**** [][][]
          []
               *****/
  private initTypeT(): void {
    console.log('T');
  }
}
