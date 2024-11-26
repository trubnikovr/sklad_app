import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 5, // Must match the highest migration version
  tables: [
    tableSchema({
      name: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'image', type: 'string', isOptional: true },
        { name: 'public', type: 'boolean' },
        { name: 'sku', type: 'string', isIndexed: true },
        { name: 'remote_id', type: 'number', isIndexed: true },
        { name: 'barcode', type: 'string' },
        { name: 'unit', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'format_price', type: 'string' },
        { name: 'qty', type: 'number' },
        { name: 'qty_sold', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    })
  ]
});
