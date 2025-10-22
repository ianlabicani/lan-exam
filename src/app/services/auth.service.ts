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
    await this.storage.create();
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

  private async setLanExamUser(authUser: IAuthUser | null) {
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
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly year: '1' | '2' | '3' | '4' | null;
  readonly section: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | null;
  readonly email_verified_at: string | null;
  readonly created_at: string;
  readonly updated_at: string;
}
