import { Component, AfterViewInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarLink } from '../navbar-link';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('header') header: ElementRef<HTMLElement>;  
  @Input('links') navbarLinks: NavbarLink[] = [];
  @Output() notifyChange: EventEmitter<boolean> = new EventEmitter();
  showMenu: boolean = false;
  
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

  onMenuBtnClick(): void {
    this.notifyChange.emit(this.showMenu = !this.showMenu);
  }
}