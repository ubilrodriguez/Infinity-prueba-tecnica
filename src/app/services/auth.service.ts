import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlSecurity = 'http://localhost:3000'; // Microservicio de seguridad
  private apiUrlClients = 'http://localhost:4000'; // Microservicio de clientes, ajusta según sea necesario

  constructor(private http: HttpClient) {}

  // Método para obtener el token
  getToken(): Observable<string> {
    return this.http.get<string>(`${this.apiUrlSecurity}/token`);
  }

  // Método para registrar un usuario
  register(user: { name: string; email: string; password: string; token: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrlClients}/register`, user); // Cambia la URL según sea necesario
  }
}
