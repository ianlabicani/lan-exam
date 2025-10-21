import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
} from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonCheckbox,
  ],
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });
  passwordVisible = signal(false);
  isSigningIn = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
    });
  }

  togglePassword() {
    this.passwordVisible.update((prev) => !prev);
  }

  login() {
    this.isSigningIn.set(true);
    const { email, password, remember } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.isSigningIn.set(false);
        this.router.navigate(['/tabs']);
        this.errorMessage.set(null);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.isSigningIn.set(false);
        this.errorMessage.set('Login failed. Please check your credentials.');
      },
    });
  }
}
