import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.component.html',
  styleUrls: ['./find-trip.component.css']
})
export class FindTripComponent implements OnInit {

  findTripForm: FormGroup;
  tripDetails: any;
  bookingId:string ='';

  constructor( private formBuilder: FormBuilder, private dataService:MockDataService) { }

  ngOnInit() {
    this.tripDetails = null;
    this.createForm()
  }

  createForm() {
    this.findTripForm = this.formBuilder.group({
      bookingCode: [null,
         Validators.compose([Validators.required,
         Validators.minLength(5),
         Validators.maxLength(6),
         Validators.pattern('[2-9,a-z,A-Z]*$')
        ])],
      familyName: [null,
         Validators.compose([Validators.required,
         Validators.minLength(2),
         Validators.maxLength(30),
         Validators.pattern('[a-z,A-Z]*$')
        ])]
    });
  }

  findTrip(values){
    this.tripDetails = {};
    // Retrieve mock data
    this.dataService.getBooking('../../assets/mock/mock.json')
      .subscribe( data => {
         // console.log(data);
         if (values.bookingCode === data.bookingCode) {
           // this.bookingId = data.bookingCode;
           this.tripDetails = data;
         }
         else{
           let error = {
             statusCode: 404,
             message:'Booking code does exist.'
           }
           this.tripDetails.error = error;
         }
      },
      error => {
       // console.error(error.statusCode, error.error)
        this.tripDetails.error = error;
      }
    );

    //reset the form
    this.findTripForm.reset();

  }


}
