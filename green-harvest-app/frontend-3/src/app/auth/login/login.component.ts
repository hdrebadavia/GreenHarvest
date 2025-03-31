import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  email: string = 'hdrebadavia@gmail.com';
  password: string = 'Greenharvest2025!';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.login()
  }
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // ✅ Handle successful login (e.g., store token, navigate)
      },
      error: (error) => {
        console.error('Login failed:', error);
        // ✅ Handle error (e.g., show error message)
      }
    });
  }
}
