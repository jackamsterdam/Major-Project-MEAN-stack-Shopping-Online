import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
quantity: number
  constructor() { }

  // @ViewChild("quantityBox")
  //     public quantityBoxRef: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.quantity = 1
  }
// do() {
//   console.log(this.quantityBoxRef.nativeElement.value)
// }
}
