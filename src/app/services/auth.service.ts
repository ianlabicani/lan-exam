import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected http = inject(HttpClient);
  protected storage = inject(Storage);

  currentUser = signal<null | undefined | IAuthUser>(undefined);

  async initLocalCurrentUser() {
    const localCurrentUser = await this.storage.get('lan-exam-user');

    if (!localCurrentUser) {
      await this.setLanExamUser(null);
      return;
    }

    const parsedUser = JSON.parse(localCurrentUser);
    this.currentUser.set(parsedUser);
  }

  login(email: string, password: string) {
    return this.http
      .post<IAuthUser>(`${environment.apiBaseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          this.setLanExamUser(user);
        })
      );
  }

  async logout() {
    await this.setLanExamUser(null);
  }

  async setLanExamUser(authUser: IAuthUser | null) {
    this.currentUser.set(authUser);
    await this.storage.set('lan-exam-user', JSON.stringify(authUser));
  }
}

export interface IAuthUser {
  token: string;
  user: IUser;
  roles: string[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  year: '1' | '2' | '3' | '4' | null;
  section: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | null;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}
