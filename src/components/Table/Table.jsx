import React, {useMemo} from "react";
import {useTable, useSortBy, useExpanded, usePagination} from 'react-table';
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";
import './table.css'

export default function Table ({tableHeaders, tableData, numberRowsToShow}) {
  const data = useMemo(() =>
      [
        ...tableData
      ],
    []
  )

  const columns = useMemo(
    () => [
      {
        id: 'expander',
        Cell: ({row}) =>
          row.canExpand ? (
            <div
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? <ArrowUp/> : <ArrowDown/>}
            </div>
          ) : null,
      },
      ...tableHeaders
    ],
    []
  )

  const {
    page,
    setPageSize,
    pageCount,
    pageOptions,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    gotoPage,
    canPreviousPage,
    canNextPage,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: numberRowsToShow || 10 }}, useSortBy, useExpanded, usePagination
  )

  return (
    <div>
      <table {...getTableProps()} className={'table'}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className={'table__header'}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className={'table__headerButton'}>
                {column.render('Header')}
                {i !== 0 &&
                <span>
                  {column.isSorted ? <ArrowUp/> : <ArrowDown/>}
                </span>}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className={'table__row'} onClick={()=>{
              console.log(row.original)
            }}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} className={'tableCell'}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )

}
