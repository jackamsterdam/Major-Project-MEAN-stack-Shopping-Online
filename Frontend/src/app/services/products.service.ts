import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { fetchCategoriesAction, selectedCategoryAction } from '../redux/categories-state';
import { addProductAction, fetchProductsAction, searchTextProductAction, updateProductAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  isAddAction = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  async getAllProducts(): Promise<ProductModel[]> {
    if (store.getState().productsState.products.length === 0) {

      const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl))
      store.dispatch(fetchProductsAction(products))
    }
    return store.getState().productsState.products
  }

  setSearchText(text: string) {
    store.dispatch(searchTextProductAction(text))
  }

  async countProducts(): Promise<number> {
    const count = await firstValueFrom(this.http.get<number>(environment.productsCountUrl))

    return count
  }

  async getAllCategories(): Promise<CategoryModel[]> {
    if (store.getState().categoriesState.categories.length === 0) {

      const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl))
      store.dispatch(fetchCategoriesAction(categories))
    }
    return store.getState().categoriesState.categories
  }

  setSelectedCategory(categoryId: string) {
    store.dispatch(selectedCategoryAction(categoryId))
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price.toString())
    formData.append('categoryId', product.categoryId)
    formData.append('image', product.image)

    const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData))
    store.dispatch(addProductAction(addedProduct))
    return addedProduct
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    const formData = new FormData()
    formData.append('_id', product._id)
    formData.append('name', product.name)
    formData.append('price', product.price.toString())
    formData.append('categoryId', product.categoryId)
    formData.append('image', product.image)

    const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product._id, formData))
    store.dispatch(updateProductAction(updatedProduct))
    return updatedProduct
  }

}
