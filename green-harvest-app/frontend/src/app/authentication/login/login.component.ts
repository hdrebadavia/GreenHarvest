import { Component } from '@angular/core';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.login();
  }

  login(): void{
    const payload = {
      username: 'hdrebadavia@gmail.com',
      password: 'Greenharvest2025!'
    }

    this.commonService.post('/users/login',payload).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        // Handle successful login here
      },
      (error: any) => {
        console.error('Login failed', error);
        // Handle login error here
      }
    );
  }
}
