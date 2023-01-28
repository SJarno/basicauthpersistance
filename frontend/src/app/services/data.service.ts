import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserPathData(): Observable<any> {
    console.log('fetch user data');
    return this.http.get(`${this.url}role-user`).pipe(tap(
      response => { console.log('Tapping into == ',response) }
    ));
  }
}
