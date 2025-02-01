import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isNavbarOpen = false; // Track whether the navbar is open or closed
  isLoggedIn = false; // Track login status
  isDropdownOpen = false;
  isModalOpen = false;
  username: string = '';
  private loginStatusSub: Subscription = new Subscription(); // Subscription to login status

  ngOnInit() {
    // Subscribe to isLoggedIn$ to get the latest login status
    this.loginStatusSub = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.username = this.authService.getUsername() || ''
      }
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

  toggleDropdown(event: Event) {
    event.stopPropagation()
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Close the navbar when a menu item is clicked
  closeNavbar(): void {
    this.isNavbarOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }


  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement

    if (!targetElement.closest('.profile-dropdown')) {
      this.isDropdownOpen = false
    }
  }
}