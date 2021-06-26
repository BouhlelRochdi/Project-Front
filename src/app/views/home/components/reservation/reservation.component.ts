import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ReservationService } from '../../../../services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  submited = false;
  id;
  indexRow = null;

  constructor(private activedRouter: ActivatedRoute,
    private reservationService : ReservationService,
    private toaster : ToasterService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.activedRouter.snapshot.params.id;
    this.reservationForm = new FormGroup({
      user: new FormGroup({
        fName: new FormControl('', Validators.required),
        lName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
      }),
      reservations: new FormArray([])
    });
  }

  
  get userForm(): FormGroup {
    return this.reservationForm.controls.user as FormGroup;
  }

  get getReservations(): FormArray {
    return this.reservationForm.controls.reservations as FormArray;
  }

  addReservation() {
    this.reservationService.createReservation(this.id, this.reservationForm.value).subscribe(res => {
      this.getReservations.push(new FormGroup({
        fName: new FormControl('', Validators.required),
        lName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required)
      }));
    }, err =>{
      this.toaster.pop('error', 'Stock is empty', err.error.message);
    })
  }

  // remove reservation from formArray 
  removeReservation(i: number){
    this.getReservations.removeAt(i);
  }

  valider() {
    this.submited = true;
    if (this.reservationForm.invalid) {
      this.toaster.pop('warning', 'Invalid form .. pleas check more')
      return;
    }
    else{
      this.reservationService.createReservation(this.id, this.reservationForm.value).subscribe(res => {
        this.toaster.pop('success', 'please check your email','Reservation complete successfully')
      },
      err => {
        this.toaster.pop('error', 'Something goes wrong!', err.error.message)
      })
      this.reservationForm.reset();
      this.submited= false;
      this.router.navigateByUrl('/home');
    }

  }

  removeAllRow()
  {
    this.getReservations.clear();
  }

}
