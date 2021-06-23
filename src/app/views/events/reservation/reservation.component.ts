import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationForm : FormGroup;
  submited = false;

  constructor() { }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      newReservation: new FormArray([])
    });

  }

  get getNewReservation():FormArray{
    return this.reservationForm.controls.newReservationArray as FormArray;
  }

  addReservation(){
    this.getNewReservation.push(new FormGroup({
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      otherEmail: new FormControl('', Validators.required)
    }));
  }

  valider(){
    this.submited = true;
    if(this.reservationForm.invalid){
      console.log('Invalid Form');
      return;
    }
    console.log('Form Valide');
    
  }

}
