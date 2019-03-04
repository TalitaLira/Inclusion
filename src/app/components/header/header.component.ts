import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUrl: any;
  menu = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getCurrentRoute();
  }

  toggleMenu() {
    this.menu = !this.menu;
  }

  selectPage(path: string) {
    this.toggleMenu();
    this.router.navigate([path]);
  }

  getCurrentRoute() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = this.router.url;
        }
      }
    );


  }



}
