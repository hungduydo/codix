import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private updateProfileUrl = 'http://localhost:3000/v1/users';
  countries = [
    { US: 'United States' },
    { UK: 'United Kingdom' },
    { FR: 'France' },
    { IT: 'Italy' },
    { VN: 'Viet Nam' },
  ];
  constructor(private http: HttpClient) {}

  updateProfile(id: string, userData: any): Observable<any> {
    return this.http.patch(`${this.updateProfileUrl}/${id}`, userData);
  }
}
