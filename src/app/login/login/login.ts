import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async iniciarSesion() {
    this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/admin']);
    } catch (e: any) {
      console.error(e);
      this.error = 'Credenciales incorrectas';
    }
  }
}
