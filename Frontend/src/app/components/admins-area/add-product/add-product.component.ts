
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
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
  products: ProductModel[] //In order to check unique name only


  formDirective: FormGroupDirective

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

  // @ViewChild('buttonBox') button: any
  isDisabled: boolean = false

  constructor(private productsService: ProductsService, private notify: NotifyService) { }

  onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    this.selectedFile = inputElement.files[0] ?? null;

  }

  async ngOnInit() {
    try {
      this.nameInput = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.isUnique()])
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
      this.products = await this.productsService.getAllProducts();

    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async add() {
    debugger
    
    // if (!this.productForm.invalid) {
    try {
      //These 4 if's is for second time you try to add a product - it won't let you without filling out all fields:
      if (this.nameInput.value === null) return 
      if (this.priceInput.value === null) return 
      if (this.categoryIdInput.value === null) return 
      if (this.imageBoxRef.nativeElement.files[0] === undefined) return 

      this.product.name = this.nameInput.value
      this.product.price = this.priceInput.value
      this.product.categoryId = this.categoryIdInput.value
      this.product.image = this.imageBoxRef.nativeElement.files[0]




      await this.productsService.addProduct(this.product)
      this.notify.success('Product has been added')

      this.dynamicClass = 'hide-hint'



 
        //We need to clear form:
                                               // this.productForm.reset()
      // this.formDirective.resetForm()
      this.productForm.reset()
  // this.productForm.invalid

      //  Reset validation error
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key).setErrors(null);
      });
  




      // this.isAddAction = true;

      // this.product = null
      // this.productsService.isAddAction.emit(true);

      // this.isDisabled = true   //not in use
// debugger
// console.log("this.button.nativeElement", this.button.nativeElement);
//       this.button.nativeElement.disabled = true
      

      // this.productForm.disabled
      // this.productForm.controls['nameInput'].disable()
      // (e.target as HTMLButtonElement).disabled = true;

    } catch (err: any) {
      this.notify.error(err)

    }
  // }
  }

  isUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.products || this.products.length === 0) {
        return null;
      }
      const nameTaken = this.products.filter(p => (p.name?.toLowerCase() === this.nameInput.value?.toLowerCase() && p._id != this.product._id))
      console.log("nameTaken", nameTaken);
      if (nameTaken.length > 0) {
        return { uniqueName: false }
      } else {
        return null
      }
    };
  }

}
