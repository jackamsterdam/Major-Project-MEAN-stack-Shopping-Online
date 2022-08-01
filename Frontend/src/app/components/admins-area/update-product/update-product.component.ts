import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryModel } from 'src/app/models/category.model';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  productToEdit: ProductModel;
  categories: CategoryModel[]
  selectedFile: any = null;
  selectedImageName: string;
  dynamicClass: string = ''
  products: ProductModel[]
  displayError = false;

  productForm: FormGroup

  nameInput: FormControl
  priceInput: FormControl
  categoryIdInput: FormControl
  imageInput: FormControl

  @ViewChild('imageBox')
  imageBoxRef: ElementRef<HTMLInputElement>



  @Input('editProduct') set editProduct(product: ProductModel) {
    if (product) {
      this.productToEdit = product;
      this.populateProductDetails();
    }
  }

  constructor(private productsService: ProductsService, private notify: NotifyService) { }

  async ngOnInit() {
    try {

      this.nameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.isUnique()])
      this.priceInput = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)])
      this.categoryIdInput = new FormControl('', [Validators.required])
      this.imageInput = new FormControl('', [Validators.required])
      this.productForm = new FormGroup({
        nameBox: this.nameInput,
        priceBox: this.priceInput,
        categoryIdBox: this.categoryIdInput,
        imageBox: this.imageInput
      })

      this.categories = await this.productsService.getAllCategories()
      this.products = await this.productsService.getAllProducts();

    } catch (err: any) {
      this.notify.error(err)
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    this.selectedFile = inputElement.files[0] ?? null;

  }

  async update() {
    try {

      this.productToEdit.name = this.nameInput.value
      this.productToEdit.price = this.priceInput.value
      this.productToEdit.categoryId = this.categoryIdInput.value
      this.productToEdit.image = this.imageBoxRef.nativeElement.files[0]

      await this.productsService.updateProduct(this.productToEdit)
      this.notify.success('Product has been updated')

      this.dynamicClass = 'hide-hint'

    } catch (err: any) {
      this.notify.error(err)
    }

  }

  populateProductDetails() {
    this.productForm.patchValue({
      nameBox: this.productToEdit.name,
      priceBox: this.productToEdit.price,
      categoryIdBox: this.productToEdit.categoryId,
      imageBox: null
    })
  }


  isUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.products || this.products.length === 0) {
        return null;
      }
      const nameTaken = this.products.filter(p => (p.name.toLowerCase() === this.nameInput.value.toLowerCase() && p._id != this.productToEdit._id))
      if (nameTaken.length > 0) {
        return { uniqueName: false }
      } else {
        return null
      }
    };
  }
}
