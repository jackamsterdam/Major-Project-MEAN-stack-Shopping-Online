import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityEnum } from 'src/app/models/city.enum';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss']
})
export class RegisterStepTwoComponent implements OnInit {
  user = new UserModel()  //I need this right?

  @Output()
  public userStepTwoDetails = new EventEmitter<UserModel>();

  isCompleted: boolean = false  //!not being used!! 

  CityEnum = CityEnum

    // second form group:
    authForm: FormGroup
    firstNameInput: FormControl
    lastNameInput: FormControl
    cityInput: FormControl 
    streetInput: FormControl

  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }


  ngOnInit() {
    this.firstNameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
    this.lastNameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100)])
    this.cityInput = new FormControl('', [Validators.required])
    this.streetInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])

    this.authForm = new FormGroup({
      firstNameBox: this.firstNameInput,
      lastNameBox: this.lastNameInput,
      cityBox: this.cityInput,
      streetBox: this.streetInput
     })
  }

  async submitStep2() {
    // try {
      console.log('user part2 before putting value', this.user)
      
  
      this.user.firstName = this.firstNameInput.value 
      this.user.lastName = this.lastNameInput.value
      this.user.city = this.cityInput.value 
      this.user.street = this.streetInput.value 
  
  
      console.log('user part2 AFTER putting value', this.user)

          this.userStepTwoDetails.emit(this.user);
  
  
      // await this.authService.register(this.user)
  
  
      // this.notify.success('You have been registered')
      // this.router.navigateByUrl('/home') //לפי האפיון ואז ילחץ התחל קנייה
      
    // } catch (err: any) {
    //   this.notify.error(err)
    // }
   }

   //If user goes back we stop him from coming back to second page without proper backend validation:
 cancelAreUnique() {
  this.isCompleted = false  //!not being used
 }

}
