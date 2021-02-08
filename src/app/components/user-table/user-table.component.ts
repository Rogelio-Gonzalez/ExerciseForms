import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseUserService } from '../../services/firebase-user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  userArray = this.userService.user;
  constructor(private router : Router, private userService : FirebaseUserService) { }
  navigateExtras : NavigationExtras={
    state : {
      user :  {
        nameUser : null,
        lastNameUser : null,
        phoneNumberUser : null,
        emailUser : null,
        postalCodeUser : null,
        directionUser : null
      }
    }
  }
  ngOnInit(): void {
  }
  goToCreateUser(){
    this.router.navigateByUrl('reactive');
  }
  deleteUser(userId : string):void{     
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUsers(userId);
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your info has been deleted.',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your info still saved',
        'error'
      )
    }
  })
  }
  goToUpdateUser(item : [string]): void{
    this.navigateExtras.state.user = item;
    this.router.navigate(['reactive'], this.navigateExtras);
  }
}
