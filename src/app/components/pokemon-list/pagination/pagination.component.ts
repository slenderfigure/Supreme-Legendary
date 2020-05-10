import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pk-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [
    './pagination.component.css',
    '../../../shared/pokemon-common.css'
  ]
})
export class PaginationComponent implements OnInit {
  @ViewChild('pageBtnWrapper') pageBtnWrapper: ElementRef<HTMLDivElement>;
  @ViewChildren('navButton') navButtons: QueryList<ElementRef<HTMLButtonElement>>;
  @Input() pageCount: number;
  @Input() activePage: number;
  @Output() changeNotify: EventEmitter<number> = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {

  }

  onClick(index: number): void { 
    this.changeNotify.emit(index); 
  }

  onNavBtnClick(direction: string): void {
    const container = this.pageBtnWrapper.nativeElement;
    const steps = direction == 'before' ? -38 : 38;
    
    container.scrollBy({ left: steps, behavior: 'smooth' });
  }

  onScroll(container: HTMLDivElement): void {
    const buttons = this.navButtons.toArray()
      .map(btn => btn.nativeElement);
    const scrollEnd = container.scrollWidth - container.clientWidth;

    if(container.scrollLeft == 0) {
      buttons[0].disabled = true;
    } else {
      buttons[0].disabled = false;
    }

    if(container.scrollLeft >= scrollEnd) {
      buttons[1].disabled = true;
    } else {
      buttons[1].disabled = false;
    }
  }

}
