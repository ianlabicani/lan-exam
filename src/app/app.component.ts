import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  protected authService = inject(AuthService);

  protected title = 'lan-exam-web';

  async ngOnInit(): Promise<void> {
    await this.authService.initLocalCurrentUser();
  }
}
