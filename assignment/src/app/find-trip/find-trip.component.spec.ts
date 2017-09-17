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

  it('should set required validation error, if fields value is empty ', () => {
    component.findTripForm.controls['bookingCode'].setValue('');
    component.findTripForm.controls['familyName'].setValue('');
    expect(component.findTripForm.controls['bookingCode'].hasError('required')).toBeTruthy();
    expect(component.findTripForm.controls['familyName'].hasError('required')).toBeTruthy();
  });

  it('should set minlength validation error, if fields value is less than minlegth ', () => {
    component.findTripForm.controls['bookingCode'].setValue('ABC');
    component.findTripForm.controls['familyName'].setValue('A');
    expect(component.findTripForm.controls['bookingCode'].hasError('minlength')).toBeTruthy();
    expect(component.findTripForm.controls['familyName'].hasError('minlength')).toBeTruthy();
  });

  it('should set maxlength validation error, if fields value is more than maxlegth ', () => {
    component.findTripForm.controls['bookingCode'].setValue('ABCDEFG');
    component.findTripForm.controls['familyName'].setValue('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    expect(component.findTripForm.controls['bookingCode'].hasError('maxlength')).toBeTruthy();
    expect(component.findTripForm.controls['familyName'].hasError('maxlength')).toBeTruthy();
  });

  it('should set pattern validation error, if pattern not match ', () => {
    component.findTripForm.controls['bookingCode'].setValue('23s122');
    component.findTripForm.controls['familyName'].setValue('12345');
    expect(component.findTripForm.controls['bookingCode'].hasError('pattern')).toBeTruthy();
    expect(component.findTripForm.controls['familyName'].hasError('pattern')).toBeTruthy();
  });

  it('should make submit button disabled when incorrect data feed', () => {
    component.findTripForm.controls['bookingCode'].setValue('23s122');
    component.findTripForm.controls['familyName'].setValue('12345');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeTruthy();
  });

  it('should make submit button enabled when correct data feed', () => {
    component.findTripForm.controls['bookingCode'].setValue('ABCDE');
    component.findTripForm.controls['familyName'].setValue('FOO');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').disabled).toBeFalsy();
  });

  it('should findTrip when submit button clicked', async(() => {
    component.findTripForm.controls['bookingCode'].setValue('PZIGZ3');
    component.findTripForm.controls['familyName'].setValue('FOO');
    fixture.detectChanges();

    spyOn(mockDataService, 'getBooking').and.returnValue(Observable.of({bookingCode: 'PZIGZ3'}));

    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');

    button.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.tripDetails.bookingCode).toEqual('PZIGZ3');
    });

  }));

});
