import * as console from 'console';
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule], 
      providers: [
        MockDataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  }));

  it('should be created', inject([MockDataService], (service) => {
    expect(service).toBeTruthy();
  }));

  describe('getBooking()', ()=> {
   
    it('should return an obsevable with mock data', inject([MockDataService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
          bookingCode:'ABCDE',
          familyName: 'FOO'
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getBooking('fakeUrl').subscribe( data => {
        expect(data.bookingCode).toEqual('ABCDE');
        expect(data.familyName).toEqual('FOO');
      })

    }))
  })
});
