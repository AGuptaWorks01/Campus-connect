import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isNavbarOpen = false; // Track whether the navbar is open or closed
  isLoggedIn = false; // Track login status
  private loginStatusSub: Subscription = new Subscription(); // Subscription to login status

  ngOnInit() {
    // Subscribe to isLoggedIn$ to get the latest login status
    this.loginStatusSub = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    // Clean up the subscription to avoid memory leaks
    if (this.loginStatusSub) {
      this.loginStatusSub.unsubscribe();
    }
  }

  // Toggle the navbar open/close state
  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // Close the navbar when a menu item is clicked
  closeNavbar(): void {
    this.isNavbarOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}