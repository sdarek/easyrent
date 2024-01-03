import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginDetails } from 'src/app/interfaces/logindetails';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]], // Changed 'email' to 'username'
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    if (this.loginForm.valid) {
      // Ensure that the values are strings. If for any reason they are not, default to an empty string
      const loginPayload: LoginDetails = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || ''
      };
  
      this.authService.loginUser(loginPayload).subscribe(
        response => {
          sessionStorage.setItem('username', loginPayload.username);
          this.router.navigate(['/home']);
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Login failed. Please check your credentials.' });
        }
      );
    } else {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Please enter valid username and password.' });
    }
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 80;
  
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  returnHome() {
    this.router.navigate(['/home']);
  }
  redirectSection(sectionId: string) {
    this.router.navigate(['/home']);

    setTimeout(() => { // setTimeout aby dać czas na przekierowanie
      this.scrollToSection(sectionId);
    }, 100);
  }
  
}
