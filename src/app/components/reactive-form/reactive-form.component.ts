import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  forms : FormGroup;
  constructor(private fb : FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  saveInfoUser(){
    if(this.forms.invalid){
      return Object.values(this.forms.controls).forEach(data => {
        data.markAllAsTouched();
      });
    }
  }
  createForm(){
    this.forms = this.fb.group({
      nameUser: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{1,40}$')]],
      lastNameUser : ['', [Validators.required, Validators.pattern('[a-zA-Z ]{1,40}$')]],
      phoneNumberUser : ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      emailUser : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$')]],
      postalCodeUser : ['', Validators.pattern('[0-9]{5}')],
      directionUser : ['', Validators.minLength(6)]
    });
  }
  get nameField(){
    return this.forms.get('nameUser');
  }
  get lastNameField(){
    return this.forms.get('lastNameUser');
  }
  get phoneField(){
    return this.forms.get('phoneNumberUser');
  }
  get emailField(){
    return this.forms.get('emailUser');
  }
  
}
