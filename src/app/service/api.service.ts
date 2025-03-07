import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://boasorte.teddybackoffice.com.br';

  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }

  getUserDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  createUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, payload);
  }

  editUser(id: number, payload: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${id}`, payload);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
