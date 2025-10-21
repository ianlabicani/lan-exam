import { Component, inject, OnInit } from '@angular/core';
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
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private storage = inject(Storage);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });
  passwordVisible = false;

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
    });
  }

  async ngOnInit() {
    // await this.storage.create();
    // const savedEmail = await this.storage.get('email');
    // const savedPassword = await this.storage.get('password');
    // if (savedEmail && savedPassword) {
    //   this.form.patchValue({
    //     email: savedEmail,
    //     password: savedPassword,
    //     remember: true,
    //   });
    // }
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  async login() {
    const { email, password, remember } = this.form.value;

    // Simulate login
    console.log('Logging in with', email);

    // if (remember) {
    //   await this.storage.set('email', email);
    //   await this.storage.set('password', password);
    // } else {
    //   await this.storage.remove('email');
    //   await this.storage.remove('password');
    // }

    alert('Login successful!');
  }
}
