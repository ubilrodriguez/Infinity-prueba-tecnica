import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from './security.service';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Añadir HttpClientModule aquí
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  users: User[] = [];
  showTable: boolean = false;
  token: string = '';

  constructor(private fb: FormBuilder, private securityService: SecurityService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      token: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    });
  }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    this.securityService.getToken().subscribe(
      (token: string) => {
        this.token = token;
        this.registerForm.patchValue({ token: token });
      },
      (error) => {
        console.error('Error al obtener el token:', error);
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
      this.users.push(user);
      this.showTable = true;
      this.registerForm.reset();
      this.getToken();
    }
  }
}
