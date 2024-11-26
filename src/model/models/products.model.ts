import { Model } from '@nozbe/watermelondb';
import { field, readonly } from '@nozbe/watermelondb/decorators';
import { IProduct } from "../../interfaces/product.ts";

export default class ProductsModel extends Model  implements IProduct{
  static table = 'products';

  @field('name') name!: string;
  @field('image') image!: string;

  // Поле модерации
  @field('public') public!: boolean;

  // Уникальные идентификаторы и штрих-коды
  @field('sku') sku!: string;
  @field('barcode') barcode!: string;
  @field('unit') unit!: string;

  // Цены
  @field('price') price!: number;
  @field('qty_sold') qty_sold!: number;


  @field('qty') qty!: number;

  @field('remote_id') remote_id!: number;

  // Даты создания и обновления
  @readonly @field('created_at') createdAt!: number;
  @readonly @field('updated_at') updatedAt!: number;

}
