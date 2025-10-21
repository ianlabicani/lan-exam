import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'exams',
        loadComponent: () =>
          import('../exams/exams.page').then((m) => m.ExamsPage),
      },
      {
        path: 'taken-exams',
        loadComponent: () =>
          import('../taken-exams/taken-exams.page').then(
            (m) => m.TakenExamsPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/exams',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/exams',
    pathMatch: 'full',
  },
];
