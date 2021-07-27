import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async addProducts(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllproducts();
    return products;
  }
  @Get(':id')
  async getSingleProduct(@Param('id') id: string) {
    const product = this.productService.getSingleProduct(id);
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      title,
      description,
      price,
    );
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return null;
  }
}
