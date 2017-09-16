import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { FindTripComponent } from './find-trip.component';
import { MockDataService } from '../services/mock-data.service';

describe('FindTripComponent', () => {
  let component: FindTripComponent;
  let fixture: ComponentFixture<FindTripComponent>;
  let debugElement: DebugElement;
  let mockDataService: MockDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, ReactiveFormsModule],
      declarations: [ FindTripComponent ],
      providers: [MockDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTripComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    mockDataService = debugElement.injector.get(MockDataService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create a findTripForm model', () => {
    //fixture.detectChanges();
    expect(component.findTripForm).toBeTruthy();
  });

  it('should make form invalid with invalid input', () => {
    component.findTripForm.controls['bookingCode'].setValue('123');
    expect(component.findTripForm.valid).toBeFalsy();
  });

  it('should make form valid with valid input', () => {
    component.findTripForm.controls['bookingCode'].setValue('ADF3F');
    component.findTripForm.controls['familyName'].setValue('Foo');
    expect(component.findTripForm.valid).toBeTruthy();
  });

  it('should contain required validation error, if field value is empty ', () => {
    component.findTripForm.controls['bookingCode'].setValue('');
    component.findTripForm.controls['familyName'].setValue('');
    expect(component.findTripForm.controls['bookingCode'].hasError('required')).toBeTruthy();
    expect(component.findTripForm.controls['familyName'].hasError('required')).toBeTruthy();
  });

  it('should contain pattern validation error, if pattern not match ', () => {
    component.findTripForm.controls['bookingCode'].setValue('23s122');
    component.findTripForm.controls['familyName'].setValue('12345');
    expect(component.findTripForm.controls['bookingCode'].hasError('pattern')).toBeTruthy();
    expect(component.findTripForm.controls['familyName'].hasError('pattern')).toBeTruthy();
  });

});
