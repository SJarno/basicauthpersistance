import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { XhrInterceptor } from './xhr.interceptor';
import { HttpClient } from '@angular/common/http';
import { httpInterceptorProviders } from '.';

describe('XhrInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [...httpInterceptorProviders]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('Should add x-requested-with header to request', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('X-Requested-With')).toBeTruthy();
    expect(req.request.headers.get('X-Requested-With')).toEqual('XMLHttpRequest');
    req.flush({});

  });
});
