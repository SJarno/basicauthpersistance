import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: AuthResponse;
  authenticated: boolean = false;
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  authenticate(credentials: any, _callback: any): Observable<any> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
    } : {});

    return this.http.get<AuthResponse>(`${this.url}user`, { headers: headers }).pipe(
      tap(response => {
        console.log('The authresponse == ', response);
        this.user = response;
        console.log('after assign', this.user);
      }),
      map((response: AuthResponse) => {
        return response;
      }),
      catchError(this.handleError<any>('Error in auth!')));
  }
  logout(): boolean {
    this.http.post(`${this.url}logout`, {}).pipe(
      tap(logoutResult => {
        console.log('Logout result in response == ', logoutResult)
      }),
      catchError(this.handleError<any>('Logging out error')))
      .subscribe(() => {
        this.user = undefined;
      });
    return true;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //We dont want to log the auth errors to console
      if (error.status !== 401) {
        console.error('Error occured == ', error);
        console.log('Logging the actual message', error.message);
        console.log(`${operation} failed: ${error.message}`)
      }
      return of(result as T);
    };
  }
}
