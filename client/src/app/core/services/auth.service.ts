import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/v1/auth/register', data);
  }

  login(logindata: any) {
    const url = 'http://localhost:3000/v1/auth/login';
    const { email, password } = logindata;
    const data = {
      email: email,
      password: password,
    };

    return this.http.post(url, data);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('user') ?? '{}')?.user;
  }

  set currentUser(nUser) {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    user.user = nUser;
    localStorage.setItem('user', JSON.stringify(user));
  }
  get token() {
    if (!localStorage.getItem('user')) {
      return null;
    }
    return JSON.parse(localStorage.getItem('user') ?? '{}')?.tokens?.access
      ?.token;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
