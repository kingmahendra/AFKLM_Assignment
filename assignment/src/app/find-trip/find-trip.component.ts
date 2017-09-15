import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.component.html',
  styleUrls: ['./find-trip.component.css']
})
export class FindTripComponent implements OnInit {

  findTripForm: FormGroup;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.findTripForm = this.formBuilder.group({
      bookingCode: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(6)])],
      familyName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])]
    });
  }

  findTrip(values){
    console.log(values);
  }


}
