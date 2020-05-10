import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { Observable, of, from, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  @ViewChild('box') box: ElementRef<HTMLElement>;
  @ViewChild('inputField') inputField: ElementRef<HTMLInputElement>;
  @ViewChild('square') square: ElementRef<HTMLElement>;
  @ViewChild('circle') circle: ElementRef<HTMLElement>;


  getNumbers(num?: number): Observable<any> {
    return from([2, -5, 16, 21, 1, 6, 33, -9]).pipe(
      filter((val: number) => val >= 15)
    );
  }


  constructor( ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getNumbers().subscribe(val => console.log(val));
  }

  activeRipple(e: MouseEvent): void {
    const box = this.box.nativeElement;
    const circle = this.circle.nativeElement;

    const left = e.pageX - box.offsetLeft + window.pageXOffset;
    const top = e.pageY - box.offsetTop + window.pageYOffset;

    circle.style.animation = 'none';

    circle.style.left = `${left}px`;
    circle.style.top = `${top}px`;
    circle.style.animation = 'ripple 0.8s ease forwards';
    
    setTimeout(() => {
      circle.style.animation = 'hide 0.5s ease forwards';
    }, 1000);
  }

}
