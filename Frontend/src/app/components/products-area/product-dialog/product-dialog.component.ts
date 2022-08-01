import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  quantity: number

  ngOnInit(): void {
    this.quantity = 1
  }
}
