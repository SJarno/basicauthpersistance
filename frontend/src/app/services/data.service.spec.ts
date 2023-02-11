import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get']) }]

    });
    service = TestBed.inject(DataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch data', () => {
    const expectedResponse: any = 'random data';
    httpClientSpy.get.and.returnValue(of(expectedResponse));
    service.getUserPathData().subscribe(response => {
      expect(response).toEqual(response);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${service.url}role-user`);
    });
    
  });
});
