import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3100/api/auth'; // Your backend URL
  private tokenKey = 'auth_token'; // Key to store the token in localStorage
  private userIdKey = 'user_id'; // Key to store the user ID in localStorage
  private usernameKey = 'username'; // Key to store the username in localStorage

  // A BehaviorSubject to track login status
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkLoginStatus()
  );

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable to listen for login status

  constructor(private http: HttpClient) { }

  // Get the authentication token from localStorage
  getAuthToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    // console.log("Fetched Token:", token); // Debugging
    return token;
  }


  // Check if user is logged in by checking if the token exists
  private checkLoginStatus(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem(this.tokenKey); // Returns true if token is present
    }
    return false;
  }

  // Login method to authenticate the user
  loginService(loginData: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  // Register method to create a new user
  registerService(registerData: {
    email: string;
    userName: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, registerData);
  }

  // Set the login status, store the token, user ID, and username
  setLoginStatus(response: { data: { _id: string; username: string }; token: string; }): void {
    console.log("Received Token from API:", response.token); // Debugging

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, response.token); // ✅ Store Token
      localStorage.setItem(this.userIdKey, response.data._id); // ✅ Store User ID
      localStorage.setItem(this.usernameKey, response.data.username); // ✅ Store Username

      // console.log("Stored Token in LocalStorage:", localStorage.getItem(this.tokenKey)); // ✅ Verify Storage
      this.isLoggedInSubject.next(true); // Notify login status change
    }
  }



  // Get the user ID from localStorage
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }




  // Get the username from localStorage
  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  // Add the token to request headers for authenticated requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // 🔹 Request password reset (send reset link to email)
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/request-password-reset`, { email });
  }

  // Reset Password - Update Password
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, {
      token,
      newPassword,
    });
  }

  // Logout method to remove the user data from localStorage
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userIdKey);
      localStorage.removeItem(this.usernameKey); // Remove username
      this.isLoggedInSubject.next(false); // Update login status to false
    }
  }
}
