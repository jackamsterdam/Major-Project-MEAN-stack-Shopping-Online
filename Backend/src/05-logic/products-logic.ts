import { CategoryModel, ICategoryModel } from "../03-models/category-model"
import ErrorModel from "../03-models/error-model"
import { IProductModel, ProductModel } from "../03-models/product-model"
import { v4 as uuid } from 'uuid'
import path from "path"
import safeDelete from "../01-utils/safe-delete"
//!erase functions you wont use 


//Get all Categories
async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate('category').exec()
}

//Count products
async function countProducts():Promise<number> {
    return ProductModel.find().count().exec()
}

//This function will be used later to get old imageName for updating product 
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).populate('category').exec()
    // console.log("product", product);  this causes program to do crazy!!!!!!!!!!!!!!!!!!!! why???
    if (!product) throw new ErrorModel(404, `Resource with _id ${_id} not found.`)
    return product
}

//Get all Categories
async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec()
}

//Get all products by Category
async function getProductsByCategory(categoryId: string): Promise<IProductModel[]> {
    return ProductModel.find({ categoryId }).populate('category').exec()
}

// Add product 
async function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    // Handle Images
    if (product.image) {
        const extension = product.image.name.substring(product.image.name.lastIndexOf('.'))
        product.imageName = uuid() + extension
        await product.image.mv(path.join(__dirname, '..', 'upload', 'images', product.imageName))
        delete product.image
    }
    return product.save()
}

//Update product
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync()
    console.log("errors", errors);
    if (errors) throw new ErrorModel(400, errors.message)
    //Handle Images

    //adding the old imageName in case user doesn't update with new photo (and user does not send imageName anyways)
    const dbProduct = await getOneProduct(product._id)
    product.imageName = dbProduct.imageName
    console.log(" product.imageName",  product.imageName);

    if (product.image) {
        //We want to delete the old image from the disk:
        safeDelete(path.join(__dirname, '..', 'upload', 'images', product.imageName))
        //Make new imageName:
        const extension = product.image.name.substring(product.image.name.lastIndexOf('.'))
        product.imageName = uuid() + extension
        console.log(" product.imageName",  product.imageName);
        await product.image.mv(path.join(__dirname, '..', 'upload', 'images', product.imageName))
        delete product.image

    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec()
    // console.log("updatedProduct", updatedProduct); goes crazy with binary if you print this
    if (!updatedProduct) throw new ErrorModel(404, `Resource with _id ${product._id} not found.`)
    return updatedProduct
}

//Delete product
async function deleteProduct(_id: string): Promise<void> {

    //image handling - we need to delete image from disk as well: 
    const product = await getOneProduct(_id)
    safeDelete(path.join(__dirname, '..', 'upload', 'images', product.imageName))

    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec()
    if (!deletedProduct) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}




export default {
    getAllProducts,
    countProducts,
    getOneProduct,
    getAllCategories,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct
}