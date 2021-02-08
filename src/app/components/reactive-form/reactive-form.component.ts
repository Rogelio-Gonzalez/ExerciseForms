import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import { FirebaseUserService } from '../../services/firebase-user.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  user : User;
  forms : FormGroup;
  valueItemUser = null;
  constructor(private fb : FormBuilder, private router: Router, private userService : FirebaseUserService) {
    this.createForm();
    const navigate = this.router.getCurrentNavigation();
    this.valueItemUser = navigate?.extras?.state?.user;
  }
   ngOnInit(): void {
    if(!(typeof this.valueItemUser === 'undefined')){
      this.forms.patchValue(this.valueItemUser);
    }
  }
  saveInfoUser(): void{
    if(this.forms.invalid){
      return Object.values(this.forms.controls).forEach(data => {
        data.markAllAsTouched();
      });
    }
    if(this.forms.valid){
      const user = this.forms.value;
      const userId = this.valueItemUser?.id || null;
      this.userService.saveUsers(user, userId);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your info has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.forms.reset();
    }

  }
  createForm(){
    this.forms = this.fb.group({
      nameUser: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{1,40}$')]],
      lastNameUser : ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{1,40}$')]],
      phoneNumberUser : ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      emailUser : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$')]],
      postalCodeUser : ['', Validators.pattern('[0-9]{5}')],
      directionUser : ['', Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{1,50}$')]
    });
  }
  goToTableInfo(){
    this.router.navigate(['table']);
  }
  validField(field : string):string{
    const validateField = this.forms.get(field);
    if(validateField.invalid && validateField.touched){
      return 'is-invalid';
    }
    if(validateField.valid && validateField.touched){
      return 'is-valid';
    }
  }
  get invalidNameField():boolean{
    return this.forms.get('nameUser').invalid && this.forms.get('nameUser').touched; 
  }
  get invalidlastNameField():boolean{
    return this.forms.get('lastNameUser').invalid && this.forms.get('lastNameUser').touched;
  }
  get invalidPhoneField():boolean{
    return this.forms.get('phoneNumberUser').invalid && this.forms.get('phoneNumberUser').touched;
  }
  get invalidEmailField():boolean{
    return this.forms.get('emailUser').invalid && this.forms.get('emailUser').touched;
  }
  get invalidPostalField(): boolean{
    return this.forms.get('postalCodeUser').invalid && this.forms.get('postalCodeUser').touched;
  }
  get invalidDirectionField():boolean{
    return this.forms.get('directionUser').invalid && this.forms.get('directionUser').touched;
  }
}
