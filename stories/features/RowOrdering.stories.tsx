import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Ordering Examples',
};

export default meta;

const columns: MRT_ColumnDef<typeof initData[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const initData = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const RowOrderingEnabled: Story<MaterialReactTableProps> = () => {
  const [data, setData] = React.useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      onRowReorder={({ movingRow, targetRow }) => {
        data.splice(targetRow.index, 0, data.splice(movingRow.index, 1)[0]);
        setData([...data]);
      }}
    />
  );
};

export const RowOrderingWithSelect: Story<MaterialReactTableProps> = () => {
  const [data, setData] = React.useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enableRowSelection
      getRowId={(row) => row.email}
      onRowReorder={({ movingRow, targetRow }) => {
        data.splice(targetRow.index, 0, data.splice(movingRow.index, 1)[0]);
        setData([...data]);
      }}
    />
  );
};

export const RowOrderingWithPinning: Story<MaterialReactTableProps> = () => {
  const [data, setData] = React.useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enablePinning
      onRowReorder={({ movingRow, targetRow }) => {
        data.splice(targetRow.index, 0, data.splice(movingRow.index, 1)[0]);
        setData([...data]);
      }}
    />
  );
};

export const RowAndColumnOrdering: Story<MaterialReactTableProps> = () => {
  const [data, setData] = React.useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableColumnOrdering
      enablePinning
      enableRowOrdering
      onRowReorder={({ movingRow, targetRow }) => {
        data.splice(targetRow.index, 0, data.splice(movingRow.index, 1)[0]);
        setData([...data]);
      }}
    />
  );
};
