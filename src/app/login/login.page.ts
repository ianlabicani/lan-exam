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
  IonSpinner,
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
import { finalize } from 'rxjs';

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
    IonSpinner,
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
    if (this.form.invalid) return;

    this.isSigningIn.set(true);
    this.errorMessage.set(null);
    const { email, password } = this.form.getRawValue();

    this.authService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.isSigningIn.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/tabs']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage.set(
            err?.error?.message ||
              'Login failed. Please check your credentials.'
          );
        },
      });
  }
}
