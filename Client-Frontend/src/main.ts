import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { Title } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers, Title], // ✅ सही तरीका
}).catch((err) => console.error(err));
