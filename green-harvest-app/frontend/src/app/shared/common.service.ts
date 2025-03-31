import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiLocal: string = 'http://localhost:5001/api';
  private api: string = 'http://localhost:5001/api';

  // constructor(private http: HttpClient) { }

  getApi(): string{
    return this.api;
  }
  // // Helper method for handling HTTP GET requests
  // get<T>(endpoint: string, params?: HttpParams): Observable<T> {
  //   return this.http
  //     .get<T>(`${this.apiLocal}${endpoint}`, { params })
  //     .pipe(catchError(this.handleError)); // Error handling
  // }

  // // Helper method for handling HTTP POST requests
  // post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
  //   return this.http
  //     .post<T>(`${this.apiLocal}${endpoint}`, data, { headers })
  //     .pipe(catchError(this.handleError)); // Error handling
  // }

  // // Helper method for handling HTTP PUT requests
  // put<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
  //   return this.http
  //     .put<T>(`${this.apiLocal}${endpoint}`, data, { headers })
  //     .pipe(catchError(this.handleError)); // Error handling
  // }

  // // Helper method for handling HTTP DELETE requests
  // delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
  //   return this.http
  //     .delete<T>(`${this.apiLocal}${endpoint}`, { params })
  //     .pipe(catchError(this.handleError)); // Error handling
  // }

  // // Error handling logic
  // private handleError(error: any): Observable<never> {
  //   console.error('An error occurred:', error); // For now, just log the error
  //   throw error; // Re-throw the error or handle it appropriately
  // }
}
