import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityEnum } from 'src/app/models/city.enum';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss']
})
export class RegisterStepTwoComponent implements OnInit {

  user = new UserModel()
  CityEnum = CityEnum

  @Output()
  public userStepTwoDetails = new EventEmitter<UserModel>();

  // second form group:
  authForm: FormGroup
  firstNameInput: FormControl
  lastNameInput: FormControl
  cityInput: FormControl
  streetInput: FormControl


  ngOnInit() {
    this.firstNameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
    this.lastNameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
    this.cityInput = new FormControl('', [Validators.required])
    this.streetInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])

    this.authForm = new FormGroup({
      firstNameBox: this.firstNameInput,
      lastNameBox: this.lastNameInput,
      cityBox: this.cityInput,
      streetBox: this.streetInput
    })
  }

  submitStep2() {
  
    this.user.firstName = this.firstNameInput.value
    this.user.lastName = this.lastNameInput.value
    this.user.city = this.cityInput.value
    this.user.street = this.streetInput.value

    this.userStepTwoDetails.emit(this.user);
  }
}
