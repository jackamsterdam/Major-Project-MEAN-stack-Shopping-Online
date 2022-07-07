import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

@Input()
productToEdit: ProductModel
  constructor() { }

  ngOnInit(): void {
  }

  // async editThisCard(_id: string) {
//   async editThisCard(_id: any) {
//     try {
//       console.log('Id', _id)
//         // await this.giftsService.deleteGift(_id);
//         // alert("Gift has been deleted");
//         // const index = this.gifts.findIndex(g => g._id === _id);
//         // this.gifts.splice(index, 1);
//     }
//     catch(err: any) {
//         alert(err.message);
//     }
// }

}
