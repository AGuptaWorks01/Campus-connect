import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isNavbarOpen = false; // Track whether the navbar is open or closed

  // Toggle the navbar open/close state
  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // Close the navbar when a menu item is clicked
  closeNavbar(): void {
    this.isNavbarOpen = false;
  }
}
