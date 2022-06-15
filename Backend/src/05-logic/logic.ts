import ErrorModel from "../03-models/error-model"

// async function getAllCategories():Promise<ICategoryModel[]> {
//     return CategoryModel.find().exec()
// }

// async function getProductsByCategory(categoryId: string):Promise<IProductModel[]> {
//     return ProductModel.find({categoryId}).populate('category').exec()
// }

// async function addProduct(product: IProductModel):Promise<IProductModel> {
//   const errors = product.validateSync()
//   if (errors) throw new ErrorModel(400, errors.message)
//   return product.save()
// }

// async function deleteProduct(_id: string):Promise<void> {
//  const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec()
//  if (!deletedProduct) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
// }


export default {

}