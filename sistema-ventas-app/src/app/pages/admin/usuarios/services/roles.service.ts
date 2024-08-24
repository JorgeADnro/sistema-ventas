import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

    constructor(private http: HttpClient) { }

    // Read All
  getRoles(): Observable<any> {
    return this.http.get(`${environment.API_URL}/roles/roles`);
  }
}