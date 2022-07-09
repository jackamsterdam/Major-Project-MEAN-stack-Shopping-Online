import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CategoryModel } from 'src/app/models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { NotifyService } from 'src/app/services/notify.service';
//!doesnt populate on start!! 
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {


  @Input()
  productToEdit: ProductModel

  categories: CategoryModel[]

  productForm: FormGroup

  nameInput: FormControl
  priceInput: FormControl
  categoryIdInput: FormControl
  imageInput: FormControl

  @ViewChild('imageBox')
  imageBoxRef: ElementRef<HTMLInputElement>

  constructor(private productsService: ProductsService, private notify: NotifyService) { }

  async ngOnInit() {
    // console.log(this.productToEdit.categoryId)
    // this.categories = store.getState().categoriesState.categories //so admin can choose a different category

    try {

      // console.log(" this.categories",  this.categories);
      



      this.nameInput = new FormControl(this.productToEdit?.name, [Validators.required, Validators.minLength(2),Validators.maxLength(100)])
      this.priceInput = new FormControl(this.productToEdit?.price, [Validators.required, Validators.min(0), Validators.max(1000)])
      //you can have problems with category cause i dont know if cateogry id or caategory name  caterogy._id ending up with catoegryid
      this.categoryIdInput = new FormControl(this.productToEdit?.category.name, [Validators.required])
      this.imageInput = new FormControl()
      this.productForm = new FormGroup({
        nameBox: this.nameInput,
        priceBox: this.priceInput,
        categoryIdBox: this.categoryIdInput,
        imageBox: this.imageInput
      })
      this.categories = await this.productsService.getAllCategories()

    } catch (err: any) {
      console.log('here?')
      this.notify.error(err)
    }
  }

  async update() {
    try {
      console.log('before',this.productToEdit)
    this.productToEdit.name = this.nameInput.value
    this.productToEdit.price = this.priceInput.value 
    this.productToEdit.categoryId = this.categoryIdInput.value 
    console.log(" this.categoryIdInput.value ",  this.categoryIdInput.value );
    this.productToEdit.image = this.imageBoxRef.nativeElement.files[0]

    console.log('after',this.productToEdit)

    await this.productsService.updateProduct(this.productToEdit)
    this.notify.success('Product has been updated')
    // this.router.navigateByUrl('/products') //no need to navigate 

    //we need to clear form:
    this.productForm.reset()

    

    } catch (err: any) {
      this.notify.error(err)
    }

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
