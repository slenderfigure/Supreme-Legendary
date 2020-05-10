import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

interface NavbarLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('header') private header: ElementRef<HTMLElement>;
  private currentRoute: string;
  isHome: boolean;

  navbarLinks: NavbarLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'Pokédex', route: '/pokedex' },
    { label: 'Video Games',  route: '/pokemon-video-games' },
    { label: 'News', route: '/pokemon-news' },
  ];
  
  constructor() { }

  ngOnInit(): void {
    this.currentRoute = this.getCurrentRoute();
    this.isHome = this.currentRoute == '/home' || this.currentRoute == '/';
  }

  private getCurrentRoute(): string {
    const url = window.location.href;
    const route = url.slice(url.lastIndexOf('/'));

    return route == '/' ? '/home' : route;
  }

  routerTest(nextRoute?: string): void {
    const header = this.header.nativeElement;

    if (this.currentRoute == nextRoute) { return; }
    
    else if (this.currentRoute == '/home') {
      header.className = 'collapse';
    }
    else if (
      this.currentRoute !== '/home' && nextRoute == '/home'
    ) {
      header.className = 'expand';
    }
    this.currentRoute = nextRoute;
  }

}