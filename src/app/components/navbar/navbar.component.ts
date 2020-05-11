import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavbarLink { label: string, route: string; }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('header') header: ElementRef<HTMLElement>; 

  navbarLinks: NavbarLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'Pokédex', route: '/pokedex' },
    { label: 'Video Games', route: '/pokemon-video-games' },
    { label: 'News', route: '/pokemon-news' },
  ];
  
  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(events => events instanceof NavigationEnd)
    ).subscribe((navigation: NavigationEnd) => {
      this.setNavbarState(navigation);
    });
  }

  private setNavbarState(navigation: NavigationEnd): void {
    const header = this.header.nativeElement;
    let url = navigation.urlAfterRedirects;
    let id = navigation.id;

    if (id == 1 && url !== '/home') {
      header.className = 'collapse-static';
    }
    else if (id > 1 && url !== '/home') {
      if (!header.classList.contains('collapse-static')) {
        header.className = 'collapse';
      }
    }
    else if (id > 1 && url == '/home') {
      header.className = 'expand';
    }
  }
}