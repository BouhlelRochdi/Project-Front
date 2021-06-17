import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor() { }

  confirm (){
      const   options = {
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4dbd74',
        cancelButtonColor: '#f86c6b',
        confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i> Yes, delete it!'        ,
      cancelButtonText: '<i class="fa fa-times" aria-hidden="true"></i> Cancel'
      };
      return Swal.fire(options);
  }
}
