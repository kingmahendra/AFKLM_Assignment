import { TestBed, inject } from '@angular/core/testing';
// import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';


import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule], 
      providers: [MockDataService]
    });
  });

  it('should be created', inject([MockDataService], (service: MockDataService) => {
    expect(service).toBeTruthy();
  }));
});
