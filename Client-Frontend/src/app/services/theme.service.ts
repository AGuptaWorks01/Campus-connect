import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  toggleDarkMode() {
    const current = this.darkMode.getValue();
    this.darkMode.next(!current);
    document.body.classList.toggle('dark-mode', !current);
  }
}