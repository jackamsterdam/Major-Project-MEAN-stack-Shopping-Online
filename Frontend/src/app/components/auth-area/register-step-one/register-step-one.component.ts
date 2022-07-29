import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss']
})
export class RegisterStepOneComponent implements OnInit {
  
  user = new UserModel()  //I need this right?
  errorNotifiction = ''

  @Output()
  public userStepOneDetails = new EventEmitter<UserModel>();

  // first form group: 
  initialInfo: FormGroup 
  ssnInput: FormControl
  usernameInput: FormControl
  passwordInput: FormControl
  passwordConfirmInput: FormControl



  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }


  ngOnInit() {
    this.ssnInput = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.patternValidator('^\\d{3}-\\d{2}-\\d{4}$')])
    this.usernameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.patternValidator('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] )
    // this.usernameInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.patternValidator('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')] )
    this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.confirmPasswordValidation()])
    this.passwordConfirmInput = new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(100), this.MatchPassword()])

  //  first part: 
  this.initialInfo = new FormGroup({
    ssnBox: this.ssnInput,
    usernameBox: this.usernameInput,
    passwordBox: this.passwordInput,
    passwordConfirmBox: this.passwordConfirmInput
  })

  }

  async goForward() {
  //! async goForward(stepper: MatStepper) {
    this.user.socialSecurityNumber = this.ssnInput.value
    this.user.username = this.usernameInput.value 
    this.user.password = this.passwordInput.value

    const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
    console.log("areUnique", areUnique);
   if (areUnique) {
    //  debugger
    this.userStepOneDetails.emit(this.user);
    //!  stepper.next()
    this.errorNotifiction = '';
    //  return null   //All paths dont return a value either do this or do ternary. 
   } else  {
    this.errorNotifiction = 'Either ssn or the email is incorrect';
    // this.notify.error('Either ssn or the email is incorrect')
    // return { userNameNotAvailable: true }
    // return { ssnInvalidorEmailInvalid: true }  //!this code is not working in my html !! 



    // return areUnique ?  stepper.next() : { ssnInvalidorEmailInvalid: true };  
   }
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
      this.errorNotifiction = '';
      return valid ? null : { invalidRegex: true };  
    };  
  }


  MatchPassword(): ValidatorFn { 
    return (control: AbstractControl): { [key: string]: any } => {  
      debugger
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

    confirmPasswordValidation(): ValidatorFn { 
      return (control: AbstractControl): { [key: string]: any } => {  
        const passwordControl = this.passwordInput  
        const confirmPasswordControl = this.passwordConfirmInput  
    
        if (!passwordControl || !confirmPasswordControl) {  
          return null;  
        }  
    
        if (passwordControl.value !== confirmPasswordControl.value) { 
          this.passwordConfirmInput.setErrors({ passwordMismatch: true });  
          return null;
        } else {  
         return null;
        }  
      }  
      };

    isFormValid() {
      console.log("this.initialInfo.invalid", this.initialInfo.invalid);
      debugger
      let x = this.usernameInput.errors?.['ssnInvalidorEmailInvalid']
      return this.initialInfo.invalid
    }

    test2() {
      return JSON.stringify(this.initialInfo.value)
    }
}
