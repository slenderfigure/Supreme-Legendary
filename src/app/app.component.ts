import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarLink } from './navbar-link';

import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showMenu: boolean = false;
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
  }

  changeState(value: boolean): void {
    const slidable = this.slidable.nativeElement;
    const state = value ? 'show' : 'hide';
    
    slidable.className = `slidable ${state}-menu`;
    document.body.style.overflow = value ? 'hidden' : 'auto';
  }

  resetMenuState(): void {
    this.navbar.showMenu = false;
    this.slidable.nativeElement.className = 'slidable hide-show';
    document.body.style.overflow = 'auto';
  }

}