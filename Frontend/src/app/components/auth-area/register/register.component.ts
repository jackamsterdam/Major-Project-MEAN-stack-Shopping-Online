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
    this.isCompleted = true 
    console.log('user', this.user)
 }

 async submitStep2() {
  try {
    console.log('user part2', this.user)
    await this.authService.register(this.user)
    this.notify.success('You have been registered')
    this.router.navigateByUrl('/home') //!Change this to producgts page!!!
    
  } catch (err: any) {
    this.notify.error(err)
  }
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