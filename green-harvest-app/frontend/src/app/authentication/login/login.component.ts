import { Component } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) {}

  ngOnInit() {

  }

  login(): void {
    const payload = {
      username: 'hdrebadavia@gmail.com',
      password: 'Greenharvest2025!',
    };

    this.http
    .post(`${this.commonService.getApi()}/users/login`, payload)
    .pipe(
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error); // Handle error properly
      })
    )
    .subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        // Handle successful login here, e.g., store token or navigate
      },
      error: (error: any) => {
        console.error('Login failed', error);
        // Handle login error here
      },
      complete: () => {
        console.log('Login request completed');
      },
    });
  }
}
