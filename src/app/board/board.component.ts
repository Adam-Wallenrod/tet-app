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

  readonly boardLength = 20;

  readonly boardWidth = 10;

  bricks: Brick[] = [];

  interval = interval(1000);

  timer: number = 0;

  #alive = true;


  constructor() {

  }

  ngOnInit() {
    this.initBricks();
    //console.log('bricks: ', this.bricks);

    this.interval
      .pipe(
        takeWhile(() => this.#alive),
      )
      .subscribe((value) => {
        this.timer = value;
        //console.log('timer: ', this.timer);
        this.setSingleBrick(5, value, 'blue');
        console.log('%c random block --> ', 'color: red',this.getNextBlock());
      });
  }


  ngOnDestroy() {
    this.#alive = false;
  }

  private initBricks(): void {
    for (let i = 0; i < this.boardLength; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
        this.bricks.push(new Brick(i, j));
      }
    }
  }

  setSingleBrick(x: number, y: number, color: string) {
    const selectedBrick = this.bricks.find(brick => brick.getX() === x && brick.getY() === y);
    selectedBrick?.mark(color);
  }

  getNextBlock(): BLOCK_TYPE {
    const max = 7 ;
    const min = 0
    //console.log('enum to array --> ', ObjectUtils.enumToArray(BLOCK_TYPE));
    const blockTypes = ObjectUtils.enumToArray(BLOCK_TYPE);
    const randomNumber = Math.floor(Math.random() * max + min)
    console.log('%c randomNumber --> ', 'color: blue', randomNumber);
    return blockTypes[randomNumber];
  }
}
