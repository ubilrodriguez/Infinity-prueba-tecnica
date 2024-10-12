import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  showTable: boolean = false;
  users: { name: string; email: string; password: string; token: string }[] = [];
  errorMessage: string | null = null; // Para almacenar mensajes de error

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    this.authService.getToken().subscribe(
      (token: string) => {
        this.registerForm.patchValue({ token: token });
      },
      (error) => {
        console.error('Error al obtener el token:', error);
        this.errorMessage = 'Error al obtener el token. Asegúrate de que el microservicio de seguridad esté funcionando.';
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.authService.register(user).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.users.push(user);
          this.registerForm.reset();
          this.getToken(); // Obtener un nuevo token después de cada registro exitoso
          this.showTable = true;
          this.errorMessage = null; // Resetear el mensaje de error
        },
        error => {
          console.error('Error en el registro:', error);
          if (error.status === 0) {
            this.errorMessage = 'Error de conexión. Verifica que el servidor de clientes esté en ejecución.';
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
        }
      );
    }
  }
}
