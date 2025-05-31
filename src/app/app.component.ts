import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    NavbarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'neeltron';
//  constructor(public router: Router) {}

//   shouldHideNavbar(): boolean {
//     const hiddenRoutes = ['/carrers'];
//     return hiddenRoutes.includes(this.router.url);
//   }
}
