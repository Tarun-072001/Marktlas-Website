import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  mobileNavActive = false;
  dropdownActive: string | null = null;
  activeLink: string = 'home';

  constructor(private router: Router) {
    // Subscribe to router events to set active link based on URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('/')[1] || 'home';
        this.activeLink = url.replace('-', '');
      }
    });
  }

  toggleMobileMenu(): void {
    this.mobileNavActive = !this.mobileNavActive;
  }

  closeMobileMenu(): void {
    this.mobileNavActive = false;
    this.dropdownActive = null;
  }

  toggleDropdown(menu: string): void {
    this.dropdownActive = this.dropdownActive === menu ? null : menu;
  }

  setActive(link: string): void {
    this.activeLink = link;
  }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }
}