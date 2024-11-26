import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'products',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'image', type: 'string', isOptional: true },
            { name: 'public', type: 'boolean' },
            { name: 'sku', type: 'string', isIndexed: true },
            { name: 'barcode', type: 'string' },
            { name: 'price', type: 'number' },
            { name: 'qty', type: 'number' },
            { name: 'total_sold', type: 'number' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' }
          ]
        }),
      ],
    },
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: 'products',
          columns: [
            { name: 'remote_id', type: 'number', isIndexed: true },
          ],
        }),
      ],
    },
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: 'products',
          columns: [
        //    { name: 'format_price', type: 'string', },
            { name: 'qty_sold', type: 'number', },
          ],
        }),
      ],
    },
    {
      toVersion: 5,
      steps: [
        addColumns({
          table: 'products',
          columns: [
            //    { name: 'format_price', type: 'string', },
            { name: 'unit', type: 'string', },
          ],
        }),
      ],
    },

  ],
})
