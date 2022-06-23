import { Component, OnInit } from '@angular/core';
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

public CityEnum = CityEnum


  // cities:CityEnum = ['LosAngeles']  type string[] is not assignable to type cityEnum than how do i do a type????? How do i use this cityEnum????
  //is there a way to do select with option CItyEnu.,Austin and CityEnum.Losangles?? or I have to make an array here??

//The only way is to write them one by one???
  // cities = ['LosAngeles', 'Manhattan', 'Miami', 'SanDiego', 'SanFrancisco', CityEnum.Austin]
  // cities = [CityEnum.LosAngeles, CityEnum.Manhattan, CityEnum.Miami, CityEnum.SanDiego, CityEnum.SanFrancisco, CityEnum.Chicago, CityEnum.Houston, CityEnum.Boston, CityEnum.Austin, CityEnum.NewOrleans]  //and by the way I cant say cities is of type: CityEnum   like CItyEnum is not a type an enum is not a type????
  user = new UserModel()

  // cities: typeof CityEnum = CityEnum

  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }
 




 async submitStep1() {
//  console.log(this.cities)
    //chage completed to true

    try {
      const areUnique = await this.authService.checkValidEmailAndSSN(this.user)
      
      // doesnt work cant put focus on second part 
      // this.initialFocus = false
      // this.switchFocus = true
      
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

 

 makeDashes(e: Event) {
  const inputElement = (e.target as HTMLInputElement);
// console.log('key', e.key)
// console.log('target', e.target)
// console.log('target', e.target.event)
console.log('inputElement',inputElement.value)
  // if(e.key === "Backspace" || e.key === "Delete") return;

  if (inputElement.value.length === 4) {
    //  ssnBox.value = phone.value + "-";
}

 }

 makeDashes2(theValue: any) {
  console.log("theValue", theValue);

 }



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