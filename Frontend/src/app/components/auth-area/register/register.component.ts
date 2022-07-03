import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class RegisterComponent {
  // using property binding when first step is completed only then isCompleted wiill change to true 
  isCompleted: boolean = false

   //Solely for the purpose of changing autofocus
  // doesnt work cant put focus on second part 

  // initialFocus: boolean = true
  // switchFocus: boolean = false 

 CityEnum = CityEnum


  // cities:CityEnum = ['LosAngeles']  type string[] is not assignable to type cityEnum than how do i do a type????? How do i use this cityEnum????
  //is there a way to do select with option CItyEnu.,Austin and CityEnum.Losangles?? or I have to make an array here??

//The only way is to write them one by one???
  // cities = ['LosAngeles', 'Manhattan', 'Miami', 'SanDiego', 'SanFrancisco', CityEnum.Austin]
  // cities = [CityEnum.LosAngeles, CityEnum.Manhattan, CityEnum.Miami, CityEnum.SanDiego, CityEnum.SanFrancisco, CityEnum.Chicago, CityEnum.Houston, CityEnum.Boston, CityEnum.Austin, CityEnum.NewOrleans]  //and by the way I cant say cities is of type: CityEnum   like CItyEnum is not a type an enum is not a type????
  user = new UserModel()

  // cities: typeof CityEnum = CityEnum

  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }
 
  async goForward(stepper: MatStepper) {
// debugger
    const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
    // debugger
   // this.isCompleted = areUnique 
   if (areUnique) {
    stepper.next()
   } else  {
    
   }
  }



 async submitStep1() {
//  console.log(this.cities)
    //chage completed to true

    try {
      const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
      
      // doesnt work cant put focus on second part 
      // this.initialFocus = false
      // this.switchFocus = true
      // debugger
      this.isCompleted = areUnique  //returns true if unique if not 400 bad request error gets caught and displays error to user. 
      // this.isCompleted = true 
      console.log('user', this.user)

   

    } catch (err: any) {
      this.notify.error(err)
    }
  
 }

 async submitStep2() {
  try {
    console.log('user part2', this.user)
    await this.authService.register(this.user)
    this.notify.success('You have been registered')
    this.router.navigateByUrl('/shopping') //!Change this to producgts page!!!
    
  } catch (err: any) {
    this.notify.error(err)
  }
 }

 //If user goes back we stop him from coming back to second page without proper backend validation:
 cancelAreUnique() {
  this.isCompleted = false
 }
// //******************************************************* */
//     // Bind to the <input type= ... > 
//     @ViewChild("ssnBox")
//     public ssnBoxRef: ElementRef<HTMLInputElement>;
// // //******************************************************* */

 makeDashes(e: Event) {
// debugger
//   this.ssnBoxRef.nativeElement    
//   console.log("this.ssnBoxRef.nativeElement", this.ssnBoxRef.nativeElement);
  const inputElement = (e.target as HTMLInputElement);
// console.log('key', e.key)
// console.log('target', e.target)
// console.log('target', e.target.event)
console.log('inputElement',inputElement.value)

  if (inputElement.value.length === 3) {
    inputElement.value = inputElement.value + '-'
  }

  if (inputElement.value.length === 6) {
    inputElement.value = inputElement.value + '-'
  }

 }

//  makeDashes2(theValue: any) {
//   console.log("theValue", theValue);

//  }

//! tried to do this: 
// const phone = document.getElementById('phone');

// phone.addEventListener("keydown", (e) => {
//     if(e.key === "Backspace" || e.key === "Delete") return;
//     if(e.target.value.length === 4) {
//         phone.value = phone.value + "-";
//     }
//     if(e.target.value.length === 9) 
//         phone.value = phone.value + "-";
//     }
//     if(e.target.value.length === 14) {
//         phone.value = phone.value + "-";
//     }
// })



// public CityEnum = CityEnum
  // public TestEnum = TestEnum;

}
// https://stackoverflow.com/questions/38554562/how-can-i-use-ngfor-to-iterate-over-typescript-enum-as-an-array-of-strings
// https://stackblitz.com/edit/angular-gujg2e?file=src%2Fapp%2Fapp.component.html
// export enum TestEnum {
// 	ENTRY1 = "Entry 1",
// 	ENTRY2 = "Entry 2",
// 	ENTRY3 = "Entry 3",
// 	ENTRY4 = "Entry 4",
// }