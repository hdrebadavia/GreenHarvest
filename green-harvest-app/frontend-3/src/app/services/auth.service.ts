import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ No need to provide in a module
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api'; // ✅ Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    const body = {
      EmailAddress: email, // ✅ Ensure keys match API payload
      Password: password
    }; // ✅ Prepare request payload

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/users/login`, body, { headers });
  }
}
