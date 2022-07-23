import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register-both-steps',
  templateUrl: './register-both-steps.component.html',
  styleUrls: ['./register-both-steps.component.scss']
})
export class RegisterBothStepsComponent implements OnInit {
  user = new UserModel()
  // isCompleted: boolean = false
  constructor(private notify: NotifyService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  @ViewChild('stepper') private myStepper: MatStepper;





//! i need MatStepper right??? so thats why i put ? 
  // userInfoFromStepOne(userStepOne: UserModel, stepper?: MatStepper) {
  userInfoFromStepOne(userStepOne: UserModel) {
  console.log("userStepOne", userStepOne);

  this.user.socialSecurityNumber = userStepOne.socialSecurityNumber
  this.user.username = userStepOne.username
  this.user.password = userStepOne.password

  // stepper.next()
  // this.isCompleted = true 
      this.myStepper.next();

  
  }

  async userInfoFromStepTwo(userStepTwo: UserModel) {
  console.log("userStepTwo", userStepTwo);

  this.user.firstName = userStepTwo.firstName
  this.user.lastName = userStepTwo.lastName
  this.user.city = userStepTwo.city
  this.user.street = userStepTwo.street

  try {
    await this.authService.register(this.user)
    console.log('this.use after submit', this.user)


    this.notify.success('You have been registered')
    this.router.navigateByUrl('/home') //לפי האפיון ואז ילחץ התחל קנייה
    
  } catch (err: any) {
    this.notify.error(err)
  }



  }


  // actually this needs to be part of the above function casue the above fucntion gets this from register part2 then we can call service casue we have everything. 
  // async allUserInfoFromBothSteps() {
  //   try {

  //     await this.authService.register(this.user)
  
  
  //     this.notify.success('You have been registered')
  //     this.router.navigateByUrl('/home') //לפי האפיון ואז ילחץ התחל קנייה
      
  //   } catch (err: any) {
  //     this.notify.error(err)
  //   }
  // }

}


