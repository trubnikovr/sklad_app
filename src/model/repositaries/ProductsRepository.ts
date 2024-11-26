import { database } from "../init.ts";
import ProductsModel from "../models/products.model.ts";
import { Q } from "@nozbe/watermelondb";
import { IProduct } from "../../interfaces/product.ts";

export class ProductsRepository {

  // Получение продукта по remote_id
  static async getProductByRemoteId(remoteId: string) {
    try {
      const products = await database
        .collections
        .get('products')
        .query(
          Q.where('remote_id', remoteId)
        )

        .fetch();

      return products.length > 0 ? products[0] as ProductsModel : null;
    } catch (error) {
      console.error('Failed to fetch product by remote_id:', error);
      throw new Error('Failed to fetch product by remote_id');
    }
  }

  // Поиск продуктов по названию
  static async searchProductsByName(searchQuery: string) {
    try {
      return await database
        .collections
        .get('products')
        .query(
          Q.where('name', Q.like(`%${searchQuery}%`)) // Поиск по подстроке в названии
        )
        .fetch();
    } catch (error) {
      console.error('Failed to search products by name:', error);
      throw new Error('Failed to search products by name');
    }
  }

  // Сохранение продуктов
  static async saveProducts(products: any[]) {
    try {
      await database.write(async () => {
        for (const product of products) {
          await database.collections.get('products').create((newProduct: ProductsModel) => {
            newProduct.name = product.name || '';
            newProduct.sku = product.sku || '';
            newProduct.price = product.price || 0;
            newProduct.qty = product.qty || 0;
            newProduct.remote_id = product.remote_id;
            newProduct.image = product.image || '';
          });
        }
      });
      console.log('Products saved successfully');
    } catch (error) {
      console.error('Failed to save products:', error);
      throw new Error('Failed to save products to database');
    }
  }

  // Получение всех продуктов
  static async getAllProducts() {
    try {
      return await database.collections.get('products').query().fetch();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  // Удаление всех продуктов
  static async clearProducts() {
    try {
      await database.write(async () => {
        const allProducts = await database.collections.get('products').query().fetch();
        for (const product of allProducts) {
          await product.destroyPermanently(); // Удаление продукта
        }
      });
      console.log('All products cleared');
    } catch (error) {
      console.error('Failed to clear products:', error);
      throw new Error('Failed to clear products');
    }
  }

  // Обновление продукта
  static async updateProduct(id: string, updatedData: Partial<ProductsModel>) {
    try {
      await database.write(async () => {
        const product = await database.collections.get('products').find(id);
        await product.update((prod) => {
          Object.assign(prod, updatedData);
        });
      });
      console.log(`Product ${id} updated successfully`);
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw new Error(`Failed to update product ${id}`);
    }
  }
}
