import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamApiService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<{ data: any }>(
      `${environment.apiBaseUrl}/student/exams`
    );
  }
}
