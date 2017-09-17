import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FindTripComponent } from './find-trip/find-trip.component';
import { MockDataService } from './services/mock-data.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpModule],
      declarations: [
        AppComponent,
        FindTripComponent
      ],
      providers: [MockDataService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
