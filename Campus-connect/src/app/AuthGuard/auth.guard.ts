import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Protect the route based on the login status
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.authService.isLoggedIn$.subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          observer.next(false); // Deny access if not logged in
        } else {
          observer.next(true); // Allow access if logged in
        }
      });
    });
  }
}
