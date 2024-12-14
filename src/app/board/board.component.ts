import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { interval, of, takeWhile } from 'rxjs';
import { Board } from './utils/board';
import { Brick } from './utils/brick';
import { GameBrick } from './utils/game-brick';
import { ObjectUtils } from './utils/ObjectUtils';

export enum BLOCK_TYPE {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  Z = 'Z',
  T = 'T'
}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit, OnDestroy {
  readonly STARTING_X_POS = 3;
  readonly STARTING_Y_POS = 0;
  readonly boardLength = 20;
  readonly boardWidth = 10;

  currentTetramino: GameBrick | undefined = undefined;

  movingBricks: Brick[] = [];
  settledBricks: Brick[] = [];

  bricks: Brick[] = [];

  board: Board = new Board();

  interval = interval(1000);

  timer: number = 0;

  #alive = true;

  @HostListener('window:keyup', ['$event'])
  keyevent( key: KeyboardEvent) {
    if(key.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveTertraminoLeft();
    }

    if(key.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveTertraminoRight();
    }
  }

  ngOnInit() {
    //this.initBoard();
    this.mainLoop();
  }

  ngOnDestroy() {
    this.#alive = false;
  }

 private getRandomTetraminoType(): BLOCK_TYPE {
    const max = 7 ;
    const min = 0
    const blockTypes = ObjectUtils.enumToArray(BLOCK_TYPE);
    const randomNumber = Math.floor(Math.random() * max + min)
    console.log('%c randomNumber --> ', 'color: blue', randomNumber);
    return blockTypes[randomNumber];
  }

  private createSingleBrick(x: number, y: number, color: string): GameBrick | undefined {
    const gameBrick = new GameBrick(x, y);
    gameBrick?.mark(color);
    if(gameBrick) {
      this.movingBricks.push(gameBrick);
    }
    return gameBrick;
  }

   private unsetSingleBrick(activeBrick: Brick): void {
    activeBrick.clear();
    this.movingBricks = this.movingBricks.filter( brick => {
      return brick.getX() !== activeBrick.getX() && brick.getY() !== activeBrick.getY();
    });
  }

  private mainLoop(): void {
    let xPosition = this.STARTING_X_POS;
    let yPosition = this.STARTING_Y_POS;
    this.interval
      .pipe(
        takeWhile(() => this.#alive),
      )
      .subscribe((value) => {
        this.timer = value;
        //console.log('timer: ', this.timer);
        const tetramino = this.createSingleBrick(xPosition, yPosition, 'blue');
        tetramino?.moveY();
        //setTimeout(() => this.unsetSingleBrick(tetramino!) , 1000)
        console.log('%c random block --> ', 'color: red',this.getRandomTetraminoType());
      });
  }

  private initBoard(): void {
    for (let j = 0; j < this.boardLength; j++) {
      for (let i = 0; i < this.boardWidth; i++) {
        this.bricks.push(new Brick(i, j));
      }
    }
  }

  private moveTertraminoLeft(): void {
  }

  private moveTertraminoRight(): void {

  }
}
