import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { RegisterFormComponent } from './app/register-form/register-form.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule, HttpClientModule) // Asegúrate de añadir HttpClientModule aquí
  ]
}).catch(err => console.error(err));
