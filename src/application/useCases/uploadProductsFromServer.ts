import { fetchProductsFromServer } from "../services/ApiService.ts";
import { BaseError } from "../../exceptions/BaseError.ts";
import { IProduct } from "../../interfaces/product.ts";
import { ProductsRepository } from "../../model/repositaries/ProductsRepository.ts";
import { ShowcaseService } from "../services/showcase.service.ts";

const uploadProductsFromServer = async () => {
  const response = await fetchProductsFromServer();

  if (!response.success || !response.data) {
    throw new BaseError(response.message);
  }
  if (!response?.data) {
    throw new BaseError("Ваша ветрина пуста");
  }
  const products: IProduct[] = response.data;

  if (!products?.length) {
    throw new BaseError("Ваша ветрина пуста");
  }
  await ShowcaseService.saveOrUpdateProducts(products);

  await ShowcaseService.removeOldProducts(products);

  return products
};

export {
  uploadProductsFromServer
}
