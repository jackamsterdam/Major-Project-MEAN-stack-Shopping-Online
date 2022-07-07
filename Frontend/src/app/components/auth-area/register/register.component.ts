import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CityEnum } from 'src/app/models/city.enum';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // using property binding when first step is completed only then isCompleted wiill change to true 
  isCompleted: boolean = false
  CityEnum = CityEnum

  //! user: UserModel which one to use: this or nexxt?
  user = new UserModel()

  // first form group: 
  initialInfo: FormGroup 
  ssnInput: FormControl
  usernameInput: FormControl
  passwordInput: FormControl
  passwordConfirmInput: FormControl

  // second form group:
  authForm: FormGroup
  firstNameInput: FormControl
  lastNameInput: FormControl
  cityInput: FormControl 
  streetInput: FormControl




  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }



  ngOnInit() {
    this.ssnInput = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.patternValidator('^\\d{3}-\\d{2}-\\d{4}$')])
   this.firstNameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
   this.lastNameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100)])
  //!  add regex!!!! email validation!! 


  
  //  this.usernameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], )
  //  this.usernameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.patternValidator()] )
   this.usernameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.patternValidator('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] )






   this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100)])
   this.passwordConfirmInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.MatchPassword()])


  //  {  
    // validator: this.MatchPassword(this.passwordInput,  this.passwordConfirmInput),  
    // validator: this.MatchPassword('password', 'confirmPassword')
   // validator: this.MatchPassword()
  // }




   this.cityInput = new FormControl('', [Validators.required])
   this.streetInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])

  //  first part: 
  this.initialInfo = new FormGroup({
    ssnBox: this.ssnInput,
    usernameBox: this.usernameInput,
    passwordBox: this.passwordInput,
    passwordConfirmBox: this.passwordConfirmInput
  })

// second part: 
   this.authForm = new FormGroup({
    firstNameBox: this.firstNameInput,
    lastNameBox: this.lastNameInput,
    cityBox: this.cityInput,
    streetBox: this.streetInput
   })
  }
 
  async goForward(stepper: MatStepper) {
    this.user.socialSecurityNumber = this.ssnInput.value
    this.user.username = this.usernameInput.value 
    this.user.password = this.passwordInput.value

    const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
    console.log("areUnique", areUnique);
  //  if (areUnique) {
    //  debugger
  //    stepper.next()
    
  //  } else  {
    // this.notify.error('either ssn or the email')
    // return { userNameNotAvailable: true }
    return areUnique ?  stepper.next() : { ssnInvalidorEmailInvalid: true };  
  //  }
  }




//  async submitStep1() {
//     try {
//       const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
    
//       this.isCompleted = areUnique 
//       console.log('user', this.user)
//     } catch (err: any) {
//       this.notify.error(err)
//     }
  
//  }

 async submitStep2() {
  try {
    console.log('user part2 before putting value', this.user)
    

    this.user.firstName = this.firstNameInput.value 
    this.user.lastName = this.lastNameInput.value
    // this.user.username = this.usernameInput.value 
    // this.user.password = this.passwordInput.value
    //!obviously no password confirm
    this.user.city = this.cityInput.value 
    this.user.street = this.streetInput.value 
    // this.user.socialSecurityNumber = this.ssnInput.value

    console.log('user part2 AFTER putting value', this.user)


    await this.authService.register(this.user)


    this.notify.success('You have been registered')
    this.router.navigateByUrl('/home') //לפי האפיון ואז ילחץ התחל קנייה
    
  } catch (err: any) {
    this.notify.error(err)
  }
 }

 //If user goes back we stop him from coming back to second page without proper backend validation:
 cancelAreUnique() {
  this.isCompleted = false
 }
 makeDashes(e: Event) {
   const keyBoardEvent = (e as KeyboardEvent);

  const inputElement = (e.target as HTMLInputElement);
// debugger
  if (keyBoardEvent.key === 'Backspace' || keyBoardEvent.key === 'Delete') return
  if (inputElement.value.length === 3) {
    inputElement.value = inputElement.value + '-'
  }

  if (inputElement.value.length === 6) {
    inputElement.value = inputElement.value + '-'
  }

 }


//  --------------------------------------------------------------------------------------------------------------------

// patternValidator(): ValidatorFn {  
//   return (control: AbstractControl): { [key: string]: any } => {  
//     if (!control.value) {  
//       return null;  
//     }  
//     // const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');  
//     // const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");  
//     const regex = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$");  
//     const valid = regex.test(control.value);  
//     return valid ? null : { invalidEmail: true };  
//   };  
// } 
patternValidator(regexInput: string): ValidatorFn {  

  return (control: AbstractControl): { [key: string]: any } => {  
    if (!control.value) {  
      return null;  
    }  
    // const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');  
    // const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");  
    const regex = new RegExp(regexInput); 
    console.log('typeof', typeof regexInput) 
    console.log(regexInput)
    const valid = regex.test(control.value);  
    console.log("control.value", control.value);
    console.log("valid", valid);
    return valid ? null : { invalidRegex: true };  
  };  
} 



MatchPassword(): ValidatorFn {  
  return (control: AbstractControl): { [key: string]: any } => {  
  //  debugger
    const passwordControl = this.passwordInput  
    const confirmPasswordControl = this.passwordConfirmInput  

    if (!passwordControl || !confirmPasswordControl) {  
      return null;  
    }  

    // if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {  
    //   return null;  
    // }  

    if (passwordControl.value !== confirmPasswordControl.value) { 
      return { passwordMismatch: true };  
      // confirmPasswordControl.setErrors({ passwordMismatch: true });  
    } else {  
     return null;
    }  
  }  
  };  
}
 



// // MatchPassword(password: string, confirmPassword: string): any {  
// MatchPassword(): any {  
//   // return (formGroup: FormGroup) => {
//     debugger
//     return null;    
//     // const passwordControl = formGroup.controls[password];  
//     // const confirmPasswordControl = formGroup.controls[confirmPassword];  
//     const passwordControl = this.passwordInput  
//     const confirmPasswordControl = this.passwordConfirmInput  

//     if (!passwordControl || !confirmPasswordControl) {  
//       return null;  
//     }  

//     if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {  
//       return null;  
//     }  

//     if (passwordControl.value !== confirmPasswordControl.value) {  
//       confirmPasswordControl.setErrors({ passwordMismatch: true });  
//     } else {  
//       confirmPasswordControl.setErrors(null);  
//     }  
//   }  
// // }  


