import { CategoryModel, ICategoryModel } from "../03-models/category-model"
import ErrorModel from "../03-models/error-model"
import { IProductModel, ProductModel } from "../03-models/product-model"
//!erase functions you wont use 

//Get all Categories
async function getAllProducts():Promise<IProductModel[]> {
    return ProductModel.find().populate('category').exec()
}

//Get all Categories
async function getAllCategories():Promise<ICategoryModel[]> {
    return CategoryModel.find().exec()
}

//Get all products by Cateogry
async function getProductsByCategory(categoryId: string):Promise<IProductModel[]> {
    return ProductModel.find({categoryId}).populate('category').exec()
}

// Add product 
async function addProduct(product: IProductModel):Promise<IProductModel> {
  const errors = product.validateSync()
  if (errors) throw new ErrorModel(400, errors.message)
  return product.save()
}

//Update product
async function updateProduct(product: IProductModel):Promise<IProductModel> {
    const errors = product.validateSync() 
    if (errors) throw new ErrorModel(400, errors.message)
   
   const updatedProduct =  await ProductModel.findByIdAndUpdate(product._id, product, {returnOriginal: false}).exec()
   if (!updatedProduct) throw new ErrorModel(404, `Resource with _id ${product._id} not found.`)
   return updatedProduct
}

//Delete product
async function deleteProduct(_id: string):Promise<void> {
 const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec()
 if (!deletedProduct) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}


export default {
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct

}