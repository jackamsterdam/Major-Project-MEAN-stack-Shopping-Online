
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  selectedFile: any = null;
  dynamicClass: string = ''

  @Input()
  addButtonClicked: boolean
  dispalyError = false;


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

  onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    this.selectedFile = inputElement.files[0] ?? null;

  }

  async ngOnInit() {
    try {

      this.nameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
      this.priceInput = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)])
      this.categoryIdInput = new FormControl('', [Validators.required])
      this.imageInput = new FormControl('', [Validators.required])  //image is required!!

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

      this.product.name = this.nameInput.value
      this.product.price = this.priceInput.value
      this.product.categoryId = this.categoryIdInput.value
      this.product.image = this.imageBoxRef.nativeElement.files[0]

      await this.productsService.addProduct(this.product)
      this.notify.success('Product has been added')

      this.dynamicClass = 'hide-hint'


      //We need to clear form:
      this.productForm.reset()

      //  Reset validation error
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key).setErrors(null);
      });

    } catch (err: any) {
      this.notify.error(err)

    }
  }

}
