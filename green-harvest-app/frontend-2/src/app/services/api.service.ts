import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 👈 No need to import HttpClientModule
})
export class ApiService {
  private baseUrl = 'https:/localh'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  /**
   * Login API Call
   * @param credentials { email: string, password: string }
   * @returns Observable<any>
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }
}
