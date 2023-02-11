import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get', 'post']) }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate the user', () => {
    const credentials = { username: 'test', password: 'test' };
    const headers = new HttpHeaders({
      authorization: 'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
    });
    const authresponse: AuthResponse = {
      username: 'test',
      authenticated: true,
      roles: [{ authority: 'ROLE_USER' }]
    };
    httpClientSpy.get.and.returnValue(of(authresponse));

    service.authenticate(credentials).subscribe(response => {
      expect(response).toEqual(authresponse);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service.url}user`,
        jasmine.objectContaining({
          headers: jasmine.objectContaining({
            lazyInit: jasmine.anything()
            //authorization: headers.get('authorization')
          })
        })
      );
    });
  });

  it('should logout user', () => {
    httpClientSpy.post.and.returnValue(of({}));
    service.logout();
    expect(httpClientSpy.post).toHaveBeenCalledWith(`${service.url}logout`, {});
    expect(service.userSubject.getValue().authenticated).toBeFalsy();
    expect(service.userSubject.getValue().username).toEqual('');
    expect(service.userSubject.getValue().roles.length).toEqual(0);

  });
});
