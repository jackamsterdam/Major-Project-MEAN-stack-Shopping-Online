import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss']
})
export class RegisterStepOneComponent implements OnInit {

  user = new UserModel()
  errorNotifiction = ''

  @Output()
  public userStepOneDetails = new EventEmitter<UserModel>();

  // first form group: 
  initialInfo: FormGroup
  ssnInput: FormControl
  usernameInput: FormControl
  passwordInput: FormControl
  passwordConfirmInput: FormControl

  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.ssnInput = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.patternValidator('^\\d{3}-\\d{2}-\\d{4}$')])
    this.usernameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.patternValidator('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
    this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.confirmPasswordValidation()])
    this.passwordConfirmInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.MatchPassword()])

    //  first part: 
    this.initialInfo = new FormGroup({
      ssnBox: this.ssnInput,
      usernameBox: this.usernameInput,
      passwordBox: this.passwordInput,
      passwordConfirmBox: this.passwordConfirmInput
    })

  }

  async goForward() {
    this.user.socialSecurityNumber = this.ssnInput.value
    this.user.username = this.usernameInput.value
    this.user.password = this.passwordInput.value

    const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
    if (areUnique) {
      this.userStepOneDetails.emit(this.user);
      this.errorNotifiction = '';
    } else {
      this.errorNotifiction = 'Either ssn or email is already taken';
    }
  }

  makeDashes(e: Event) {
    const keyBoardEvent = (e as KeyboardEvent);

    const inputElement = (e.target as HTMLInputElement);
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
      const regex = new RegExp(regexInput);
      const valid = regex.test(control.value);
      this.errorNotifiction = '';
      return valid ? null : { invalidRegex: true };
    };
  }


  MatchPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      const passwordControl = this.passwordInput
      const confirmPasswordControl = this.passwordConfirmInput

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        return { passwordMismatch: true };
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
    return this.initialInfo.invalid
  }
}
