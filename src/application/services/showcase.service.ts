import { ProductsRepository } from "../../model/repositaries/ProductsRepository.ts";
import { database } from "../../model/init.ts";
import { Q } from "@nozbe/watermelondb";
import { IProduct } from "../../interfaces/product.ts";


export class ShowcaseService {

  // Получение продуктов с пагинацией
  static async getProducts(page: number = 1, limit: number = 20,  text ='') {
    try {
      const offset = (page - 1) * limit; // Calculate offset

      // Build query conditions
      const queryConditions = [];

      if (text) {
        queryConditions.push(
          Q.where('name', Q.like(`%${Q.sanitizeLikeString(text)}%`))
        );
      }

      queryConditions.push(
        Q.skip(offset),
        Q.take(limit),
      );


      const products = await database.collections.get('products')
        .query(
          ...queryConditions
        )
      return products as unknown as IProduct[];
    } catch (error) {
      console.error('Failed to fetch paginated products:', error);
      throw new Error('Failed to fetch paginated products');
    }
  }

  // Сохранение или обновление продуктов
  static async saveOrUpdateProducts(products: any[]) {
    try {

      for (const product of products) {
        const existingProduct = await ProductsRepository.getProductByRemoteId(product.remote_id);

        // Обновляем существующий продукт
        if (existingProduct) {

          await ProductsRepository.updateProduct(existingProduct.id, {
            name: product.name || existingProduct.name,
            sku: product.sku || existingProduct.sku,
            price: product.price || existingProduct.price,
            unit: product.unit || existingProduct.unit,
            qty: product.qty || existingProduct.qty,
            image: product.image || existingProduct.image,
          });
          continue;
        }

        await ProductsRepository.saveProducts([product]);
      }

      console.log('Products processed successfully');
    } catch (error) {
      console.error('Failed to process products:', error);
      throw new Error('Failed to process products');
    }
  }

  // Очистка витрины
  static async clearShowcase() {
    try {
      await ProductsRepository.clearProducts();
      console.log('Showcase cleared successfully');
    } catch (error) {
      console.error('Failed to clear showcase:', error);
      throw new Error('Failed to clear showcase');
    }
  }

  // Обновление конкретного продукта витрины
  static async updateShowcaseProduct(id: string, updatedData: any) {
    try {
      await ProductsRepository.updateProduct(id, updatedData);
      console.log(`Product ${id} updated successfully`);
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw new Error(`Failed to update product ${id}`);
    }
  }

  static async removeOldProducts(products: IProduct[]) {
    const newRemoteIds = products.map((product) => product.remote_id);

    const currentProducts = await database.collections.get('products').query().fetch();

    // Удаляем записи, у которых `remote_id` отсутствует в новых данных
    const productsToDelete = currentProducts.filter(
      (product: any) => !newRemoteIds.includes(product.remote_id)
    );

    await database.write(async () => {
      for (const product of productsToDelete) {
        await product.destroyPermanently(); // Теперь это работает внутри Writer
      }
    });
  }
}
