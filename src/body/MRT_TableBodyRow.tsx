import React, { FC, MouseEvent } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';

interface Props {
  row: Row;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const {
    OverrideTableBodyRowComponent,
    anyRowsCanExpand,
    enableSelection,
    enableSubRowTree,
    enableColumnHiding,
    onRowClick,
    renderDetailPanel,
    tableInstance,
  } = useMaterialReactTable();

  if (OverrideTableBodyRowComponent) {
    return <>{OverrideTableBodyRowComponent(row, tableInstance)}</>;
  }

  return (
    <>
      <TableRow
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        {...row.getRowProps()}
      >
        {enableSelection && <MRT_SelectCheckbox row={row} />}
        {((enableSubRowTree && anyRowsCanExpand) || renderDetailPanel) &&
          (row.canExpand || renderDetailPanel ? (
            <MRT_ExpandButton row={row} />
          ) : (
            <TableCell />
          ))}
        {row.cells.map((cell, index) => (
          <MRT_TableBodyCell key={`${index}-${cell.value}`} cell={cell} />
        ))}
        {enableColumnHiding && <TableCell />}
      </TableRow>
      {renderDetailPanel && <MRT_TableDetailPanel row={row} />}
    </>
  );
};
