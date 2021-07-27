import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    // const prodId = new Date().toISOString();
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }
  async getAllproducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }
  async getSingleProduct(id: string): Promise<any> {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }
  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(id);
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    return updatedProduct.save();
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('no product with that id');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    // const productIndex = this.products.findIndex((prod) => prod.id === id);
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException(`Couldn't find product`);
    }

    if (!product) {
      throw new NotFoundException(`Couldn't find product`);
    }
    return product;
  }
}
