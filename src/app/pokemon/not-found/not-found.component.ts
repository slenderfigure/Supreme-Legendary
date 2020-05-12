import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { Observable, of, from, fromEvent, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


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


  abilities: string[] = [];
  
  getAbilities(): Observable<string[]> {
    return this.http.get<string[]>('../../api/abilities.json');
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputField.nativeElement, 'input').pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(() => this.getAbilities())
    ).subscribe((abilities: string[]) => {
      const value = this.inputField.nativeElement.value.trim().toLowerCase();

      this.abilities = abilities.filter(val => val.slice(0, value.length).toLowerCase() == value);
      
      console.log(this.abilities);
    });
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
