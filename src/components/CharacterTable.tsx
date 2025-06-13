import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';


type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
};

const columnHelper = createColumnHelper<Character>();

const CharacterTable = ({ data, info, currentPage }: any) => {
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: 'Status',
    }),
    columnHelper.accessor('species', {
      cell: (info) => info.getValue(),
      header: 'Species',
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (newPage: number) => {
    navigate({ to: '/', search: { page: String(newPage) } });
  };

  return (
    <div>
      <table className="border w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border px-2 py-1">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => navigate({ to: `/character/${row.original.id}` })} className="cursor-pointer hover:bg-gray-100">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border px-2 py-1">
                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        <button
          disabled={!info.prev}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={!info.next}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterTable;