import { CategoryModel, ICategoryModel } from "../03-models/category-model"
import ErrorModel from "../03-models/error-model"
import { IProductModel, ProductModel } from "../03-models/product-model"
import { v4 as uuid } from 'uuid'
import path from "path"
import safeDelete from "../01-utils/safe-delete"


//Get all Categories
async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate('category').exec()
}

//Count products
async function countProducts(): Promise<number> {
    return ProductModel.find().count().exec()
}

//This function will be used later to get old imageName for updating product 
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).populate('category').exec()
    if (!product) throw new ErrorModel(404, `Resource with _id ${_id} not found.`)
    return product
}

//Get all Categories
async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec()
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
         //Do not save image in Mongo:
         product.image = undefined
    }
    return product.save()
}

//Update product
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    //Handle Images

    //adding the old imageName in case user doesn't update with new photo (and user does not send imageName anyways)
    const dbProduct = await getOneProduct(product._id)
    product.imageName = dbProduct.imageName

    if (product.image) {
        //We want to delete the old image from the disk:
        safeDelete(path.join(__dirname, '..', 'upload', 'images', product.imageName))
        //Make new imageName:
        const extension = product.image.name.substring(product.image.name.lastIndexOf('.'))
        product.imageName = uuid() + extension
        await product.image.mv(path.join(__dirname, '..', 'upload', 'images', product.imageName))
        //Do not save image in Mongo:
        product.image = undefined
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec()
    if (!updatedProduct) throw new ErrorModel(404, `Resource with _id ${product._id} not found.`)
    return updatedProduct
}

export default {
    getAllProducts,
    countProducts,
    getOneProduct,
    getAllCategories,
    addProduct,
    updateProduct
}