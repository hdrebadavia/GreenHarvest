import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private commonService: CommonService, private router: Router) {}

  onSubmit() {
    const loginData = {
      EmailAddress: this.email,
      Password: this.password
    };

    this.commonService.insert('http://localhost:5000/api/users/login', loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        // Store the JWT token in local storage
        localStorage.setItem('token', response.token);
        // Navigate to the home page or another protected route
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}