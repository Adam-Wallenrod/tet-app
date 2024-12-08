import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, of, takeWhile } from 'rxjs';
import { Brick } from './utils/brick';
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

  movingBricks: Brick[] = [];

  settledBricks: Brick[] = [];

  bricks: Brick[] = [];

  interval = interval(1000);

  timer: number = 0;

  #alive = true;


  constructor() {

  }

  ngOnInit() {
    this.initBoard();
    this.animateMoveDown();
  }


  ngOnDestroy() {
    this.#alive = false;
  }

  private animateMoveDown(): void {
    let xPosition = this.STARTING_X_POS;
    let yPosition = this.STARTING_Y_POS;
    this.interval
      .pipe(
        takeWhile(() => this.#alive),
      )
      .subscribe((value) => {
        this.timer = value;
        //console.log('timer: ', this.timer);
        const movingBrick = this.setSingleBrick(xPosition, yPosition, 'blue');
        yPosition++;
        setTimeout(() => this.unsetSingleBrick(movingBrick!) , 1000)
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

  setSingleBrick(x: number, y: number, color: string): Brick | undefined {
    const selectedBrick = this.bricks.find(brick => brick.getX() === x && brick.getY() === y);
    selectedBrick?.mark(color);
    if(selectedBrick) {
      this.movingBricks.push(selectedBrick);
    }
    return selectedBrick;
  }

  unsetSingleBrick(activeBrick: Brick): void {
    activeBrick.clear();
    this.movingBricks = this.movingBricks.filter( brick => {
      return brick.getX() !== activeBrick.getX() && brick.getY() !== activeBrick.getY();
    });
  }

  getRandomTetraminoType(): BLOCK_TYPE {
    const max = 7 ;
    const min = 0
    //console.log('enum to array --> ', ObjectUtils.enumToArray(BLOCK_TYPE));
    const blockTypes = ObjectUtils.enumToArray(BLOCK_TYPE);
    const randomNumber = Math.floor(Math.random() * max + min)
    console.log('%c randomNumber --> ', 'color: blue', randomNumber);
    return blockTypes[randomNumber];
  }
}
