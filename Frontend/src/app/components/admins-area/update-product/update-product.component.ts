import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  // @Input()
  // buttonPlusVisible: boolean

selectedFile: any = null;
selectedImageName: string;
dynamicClass: string = ''

// onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0] ?? null;

// }
onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    // debugger
    this.selectedFile = inputElement.files[0] ?? null;
//    this.selectedImageName =  this.selectedFile.name;

}


  productToEdit: ProductModel;

  @Input('editProduct') set editProduct(product: ProductModel) {
    // debugger
    if (product) {
      this.productToEdit = product;
      this.populateProductDetails();

      // this.buttonPlusVisible = false
    }
}

  categories: CategoryModel[]

  productForm: FormGroup

  nameInput: FormControl
  priceInput: FormControl
  categoryIdInput: FormControl
  imageInput: FormControl

  @ViewChild('imageBox')
  imageBoxRef: ElementRef<HTMLInputElement>

  constructor(private productsService: ProductsService, private notify: NotifyService) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //  console.log(changes) I dont see a change when click same button
  // }

  async ngOnInit() {
    // console.log(this.productToEdit.categoryId)
    // this.categories = store.getState().categoriesState.categories //so admin can choose a different category

    try {

      // console.log(" this.categories",  this.categories);
      
      this.nameInput = new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(100)])
      this.priceInput = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)])
      //you can have problems with category cause i dont know if cateogry id or caategory name  caterogy._id ending up with catoegryid
      this.categoryIdInput = new FormControl('', [Validators.required])
      this.imageInput = new FormControl('', [Validators.required])  //!Do you really want image required????
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
    debugger
    this.productToEdit.image = this.imageBoxRef.nativeElement.files[0]

    console.log('after',this.productToEdit)

    await this.productsService.updateProduct(this.productToEdit)
    this.notify.success('Product has been updated')
    // this.router.navigateByUrl('/products') //no need to navigate 

    this.dynamicClass ='hide-hint'

    //we need to clear form:
    this.productForm.reset()

    

    } catch (err: any) {
      this.notify.error(err)
    }

  }

populateProductDetails() {
  // debugger
  this.productForm.patchValue({
    nameBox: this.productToEdit.name,
    priceBox: this.productToEdit.price,
     categoryIdBox:this.productToEdit.category._id
  })
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
