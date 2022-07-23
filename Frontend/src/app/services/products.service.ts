import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { fetchCategoriesAction, selectedCategoryAction } from '../redux/categories-state';
import { addProductAction, deleteProductAction, fetchProductsAction, searchTextProductAction, updateProductAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  async getAllProducts():Promise<ProductModel[]> {
    if (store.getState().productsState.products.length === 0) {

      const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl))
      store.dispatch(fetchProductsAction(products))
    }
    return store.getState().productsState.products
  } 


  setSearchText(text: string) {
    const filteredProducts = store.dispatch(searchTextProductAction(text))
  }

  async countProducts():Promise<number> {
   //?maybe redux save count
      const count = await firstValueFrom(this.http.get<number>(environment.productsCountUrl))
      
    return count
  } 

  //!not sure this function is in use if not delete it !! 
  async getOneProduct(_id: string): Promise<ProductModel> {
    let product = store.getState().productsState.products.find(p => p._id === _id)
    if (!product) {
      product = await firstValueFrom(this.http.get<ProductModel>(environment.productsUrl + _id))
    }
   
    return product 
  }

  async getAllCategories():Promise<CategoryModel[]> {
    // console.log("store.getState().categoriesState.categories.length === 0", store.getState().categoriesState.categories.length === 0);
    if (store.getState().categoriesState.categories.length === 0) {

      const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl))
      store.dispatch(fetchCategoriesAction(categories))
    }
    return store.getState().categoriesState.categories
  }

  //!do i need redux for this?? how to do redux for this if i had pagaination i would have to do this but now i can ust filter caeogires fro, the store 
  async getProductsByCategory(categoryId: string):Promise<ProductModel[]> {
   const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId))
   return products 
  }

  setSelectedCategory(categoryId: string) {
    store.dispatch(selectedCategoryAction(categoryId))
  }

  async addProduct(product: ProductModel):Promise<ProductModel> {

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price.toString())
    formData.append('categoryId', product.categoryId)
    formData.append('image', product.image)

    //! Do we need to apppend category ? 

    const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData))
    store.dispatch(addProductAction(addedProduct))
    return addedProduct
  }

  async updateProduct(product: ProductModel):Promise<ProductModel> {
debugger
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

  async deleteProduct(_id: string):Promise<void> {
    await firstValueFrom(this.http.delete(environment.productsUrl + _id))
    store.dispatch(deleteProductAction(_id))
  }
}
