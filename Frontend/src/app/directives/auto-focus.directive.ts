
import {AfterViewInit, Directive,ElementRef} from '@angular/core'
  
@Directive({
    selector:'autofocus' 
})
export class AutoFocusDirective implements AfterViewInit{
  
    constructor(
        private elementRef: ElementRef
    ){}
  
    ngAfterViewInit(){
        this.elementRef.nativeElement.focus();
    }
}


//! https://www.geeksforgeeks.org/how-to-set-focus-on-input-field-automatically-on-page-load-in-angularjs/


//!!!!!!!!! delete this directive works without but actually doesnt work cause i wanted to switch pages and focus to work but forcus doesnt work when switch pages 