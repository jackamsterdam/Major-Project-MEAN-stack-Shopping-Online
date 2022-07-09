
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public isButtonVisible = true;

  // product: ProductModel;
  product = new ProductModel()
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
    try {
      //Since we populated the store with all cateogries already this following code with just get all categories from store and not from backend ( Same thing as if I were to write - store.getState().categoriesState.categories.)
      //!try this above store instead of next line!!! 
      
      
      this.nameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
      this.priceInput = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)])
      this.categoryIdInput = new FormControl('', [Validators.required])
      this.imageInput = new FormControl()
      
      this.productForm = new FormGroup({
        nameBox: this.nameInput,
        priceBox: this.priceInput,
        categoryIdBox: this.categoryIdInput,
        imageBox: this.imageInput
      })
      
      //Must be after above because await doesnt let formControl get initialized
      this.categories = await this.productsService.getAllCategories()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async add() {
    try {

      console.log('before product', this.product)
      this.product.name = this.nameInput.value
      this.product.price = this.priceInput.value
      this.product.categoryId = this.categoryIdInput.value
      this.product.image = this.imageBoxRef.nativeElement.files[0]

      console.log('after giving product all the values from form', this.product)
      await this.productsService.addProduct(this.product)
      this.notify.success('Product has been added')

      //we need to clear form:
       this.productForm.reset()

    } catch (err: any) {
      this.notify.error(err)

    }
  }

}
