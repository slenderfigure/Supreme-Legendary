import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarLink } from './navbar-link';

import { NavbarComponent } from './navbar/navbar.component';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('slidable') slidable: ElementRef<HTMLElement>;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  links: NavbarLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'Pokédex', route: '/pokedex' },
    { label: 'Add Pokémon', route: '/add-new' },
    { label: 'Video Games', route: '/pokemon-video-games' },
    { label: 'News', route: '/pokemon-news' }
  ];

  ngAfterViewInit(): void {
    this.navbar.notifyChange.subscribe(value => this.changeState(value));

    this.onResize();
    this.onClickOutside();    
  }

  private onResize(): void {
    fromEvent(window, 'resize').subscribe(() => {
      if (this.navbar.showMenu && window.innerWidth > 800) {
        this.resetMenuState();
      }
    });
  }

  private onClickOutside(): void {
    fromEvent(this.slidable.nativeElement, 'click').pipe(
      map(e => e.target as HTMLElement)
    ).subscribe(target => {
      if (this.navbar.showMenu && !target.classList.contains('fas')) {
        this.resetMenuState();
      }
    });
  }

  private changeState(value: boolean): void {
    const slidable = this.slidable.nativeElement;
    const state = value ? 'show' : 'hide';
    
    slidable.className = `slidable ${state}-menu`;
    document.body.style.overflow = value ? 'hidden' : 'auto';
  }

  resetMenuState(): void {
    this.navbar.showMenu = false;
    this.slidable.nativeElement.className = 'slidable hide-menu';
    document.body.style.overflow = 'auto';
  }

}