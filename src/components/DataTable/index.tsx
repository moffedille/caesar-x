import { useState, useReducer } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { Entry } from '../../types';

const columnHelper = createColumnHelper<Entry>()

const columns = [
  columnHelper.accessor('name_first', {
    header: () => <span>Fornavn</span>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.name_last, {
    id: 'name_last',
    header: () => <span>Etternavn</span>,
  }),
  columnHelper.accessor('age', {
    header: () => 'Alder',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('street', {
    header: () => <span>Gateadresse</span>,
  }),
  columnHelper.accessor('city', {
    header: 'By',
  }),
  columnHelper.accessor('state', {
    header: 'Stat',
  }),
  columnHelper.accessor('ccnumber', {
    header: 'Kortnummer',
  })
]

export const DataTable = ({ initialData }) => {
  const [data, _setData] = useState(initialData)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}