/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  useBlockLayout,
  useResizeColumns
} from 'react-table'
import { useSticky } from 'react-table-sticky'

import SortColumn from '../../Atoms/SortColumn'
import {
  TCustomTableProps,
  TBorderColumn,
  TColumnsProps,
  THeaderProps,
  TSortBy
} from '../../../typing/table'
import {
  TableContainer,
  TBody,
  THead,
  Row,
  Header,
  Cell,
  Loading,
  Content
} from './styles'

const prepearHeaderBorder = (
  columns: TColumnsProps[],
  isNodeFather?: boolean,
  noData?: boolean
) => {
  columns.forEach((column: TColumnsProps, index: number) => {
    if (column.border) {
      if (column.columns && column.columns.length) {
        column.columns.forEach((childColumn: TColumnsProps) => {
          if (column.border)
            childColumn.border = {
              color: column.border.color
            }
        })
        prepearHeaderBorder(column.columns, false, noData)
      }
      if (isNodeFather) {
        column.border.type = ['border-top', 'border-side-by-side']
      } else if (columns.length === 1) {
        column.border.type = ['border-side-by-side']
      } else if (index === 0) {
        column.border.type = ['border-left']
      } else if (index === columns.length - 1) {
        column.border.type = ['border-right']
      }

      if (!column.columns && noData) {
        if (column.border.type) {
          column.border.type.push('border-bottom')
        } else column.border.type = ['border-bottom']
      }
    }
  })
}

const CustomTable = ({
  sortServerSide = false,
  FiltersComponent,
  asyncSortByFn,
  columns = [],
  loadingText,
  data = [],
  minHeight,
  loading,
  selectedItem,
  defaultSortByItem,
  setInfoResizing
}: TCustomTableProps) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 30,
      maxWidth: 600
    }),
    []
  )

  const [mounted, setMounted] = useState<boolean>(false)
  prepearHeaderBorder(columns, true, !!loading || !data || data.length === 0)

  const defaultSortBy: TSortBy[] = defaultSortByItem ? [defaultSortByItem] : []

  const {
    state: { sortBy, globalFilter, columnResizing },
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setGlobalFilter,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      manualSortBy: sortServerSide,
      initialState: {
        sortBy: defaultSortBy,
        hiddenColumns: columns.map((column) => {
          // @ts-ignore
          if (column.show === false) return column.accessor || column.id
        })
      }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useSticky,
    useBlockLayout,
    useResizeColumns
  )

  React.useEffect(() => {
    if (setInfoResizing && mounted) {
      setInfoResizing(columnResizing.columnWidths)
    }
  }, [columnResizing.columnWidths])

  React.useEffect(() => {
    async function callBack() {
      if (mounted) {
        if (sortServerSide && asyncSortByFn && sortBy)
          await asyncSortByFn(sortBy)
      }
    }
    callBack()
  }, [sortBy])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getAttributesTable = () => ({ style: { minHeight } })

  const getAttributesHeader = (propCols: THeaderProps) => {
    const propColumns = propCols

    if (propColumns?.key) delete propColumns.key

    return propColumns
  }

  const getAttributesByColumn = (column: any) => {
    return {
      borderColor: column?.border?.color,
      margin: column.margin
    }
  }

  const getClassCell = (
    borderDate: TBorderColumn,
    lastRow: boolean,
    isEmptyColumn?: boolean
  ) => {
    let classes: any = []
    if (borderDate) {
      if (borderDate.type) classes = [...borderDate.type]
      if (lastRow) classes.push('border-bottom')
    }

    if (isEmptyColumn) {
      classes.push('empty-cell')
    }

    return classes.join(' ')
  }

  const getClassHeader = (column: any) => {
    let classes: any = []
    if (column.border && column.border.type) {
      classes = [...column.border.type]
    }
    if ((!column.columns || !column.columns.length) && !column.headers)
      classes.push('has-no-child')

    return classes.join(' ')
  }

  const filterprops = { setGlobalFilter, globalFilter }

  const getRowClass = (values: any) => {
    let classes = ''
    if (selectedItem) {
      if (values[selectedItem?.prop] === selectedItem?.value) {
        classes += 'selected'
      }
    }

    return classes
  }

  return (
    <React.Fragment>
      {!!FiltersComponent && (
        <div data-testid='filters-table'>
          <FiltersComponent {...filterprops} />
        </div>
      )}
      <TableContainer {...getAttributesTable()} data-testid='custom-table'>
        <table role='table' className='sticky' {...getTableProps()}>
          <THead data-testid='header-columns-table'>
            {headerGroups.map((headerGroup) => {
              const { key, role } = headerGroup.getHeaderGroupProps()
              return (
                <Row key={key} role={role}>
                  {headerGroup.headers.map((column: any, index: number) => {
                    const {
                      key: keyHeader,
                      role: roleHeader,
                      style
                    } = column.getHeaderProps(column.getSortByToggleProps())

                    const columnProps = column.getHeaderProps(
                      column.getSortByToggleProps({ title: undefined })
                    )

                    return (
                      <React.Fragment key={index}>
                        <Header
                          {...getAttributesHeader(columnProps)}
                          {...getAttributesByColumn(column)}
                          className={getClassHeader(column)}
                          style={style}
                          key={keyHeader}
                          role={roleHeader}
                          align={column.align}
                        >
                          {!column.isEmptyColumn && (
                            <div
                              className={`flex-column ${
                                column.align ? `align-${column.align}` : ''
                              }`}
                            >
                              <div className='header-cell'>
                                {column.render('Header')}

                                {column.isSorted ? (
                                  <SortColumn isDesc={column.isSortedDesc} />
                                ) : (
                                  column.canFilter && <BsArrowDownUp />
                                )}

                                <div
                                  {...column.getResizerProps({
                                    onClick(ev: any) {
                                      ev.stopPropagation()
                                    }
                                  })}
                                  className={`resizer ${
                                    column.isResizing ? 'isResizing' : ''
                                  }`}
                                />
                              </div>
                            </div>
                          )}
                        </Header>
                      </React.Fragment>
                    )
                  })}
                </Row>
              )
            })}
          </THead>

          <TBody role='rowgroup' {...getTableBodyProps()}>
            {!loading &&
              rows.map((row, index) => {
                prepareRow(row)

                return (
                  <Row
                    {...row.getRowProps()}
                    key={`row-${index}`}
                    background={selectedItem?.backgroundColor}
                    className={getRowClass(row.values)}
                  >
                    {row.cells.map((cell: any, index: number) => {
                      return (
                        <Cell
                          data-testid='cell-data-table'
                          {...cell.getCellProps()}
                          key={`cell-${index}`}
                          {...getAttributesByColumn(cell.column)}
                          className={getClassCell(
                            cell.column.border,
                            row.index === rows.length - 1,
                            cell.column.isEmptyColumn
                          )}
                        >
                          <Content {...getAttributesByColumn(cell.column)}>
                            {cell.render('Cell')}
                          </Content>
                        </Cell>
                      )
                    })}
                  </Row>
                )
              })}
          </TBody>
        </table>
        {loading && (
          <Loading>
            <span>{loadingText}</span>
          </Loading>
        )}
      </TableContainer>
    </React.Fragment>
  )
}

export default CustomTable
