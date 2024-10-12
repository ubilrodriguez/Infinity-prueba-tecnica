import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SecurityService {
    private apiUrl = 'http://localhost:3000'; // Asume que tu servicio corre en el puerto 3000
    constructor(private http: HttpClient) { }
  
    getToken(): Observable<string> {
      return this.http.get<string>(`${this.apiUrl}/token`);
    }
  }
  