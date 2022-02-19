import React from 'react'
import { SortingRule } from 'react-table'

export type TBorderColumn = {
  color: string
  type?: Array<
    | 'border-side-by-side'
    | 'border-top'
    | 'border-bottom'
    | 'border-left'
    | 'border-right'
  >
}

export type TColumnsProps = {
  align?: 'center' | 'flex-start' | 'flex-end'
  margin?: number
  isEmptyColumn?: boolean
  border?: TBorderColumn
  accessor?: string
  minWidth?: number
  maxWidth?: number
  sticky?: string
  columns?: TColumnsProps[]
  Header: any
  width?: number
}

export type TSelectedItem = {
  prop: string
  value: string
  backgroundColor?: string
}

export type TTableProps = {
  FiltersComponent?: ({
    setGlobalFilter,
    globalFilter
  }: {
    setGlobalFilter: any
    globalFilter: any
  }) => React.ReactElement
  asyncSortByFn?: (sortBy: SortingRule<object>[]) => void
  columns?: TColumnsProps[]
  sortServerSide?: boolean
  loadingText?: string
  minHeight?: number
  loading?: Boolean
  hidden?: boolean
  error?: boolean
  data?: any
  selectedItem?: TSelectedItem
  defaultSortByItem?: TSortBy | null
  setInfoResizing?: (fieldResizing: TFieldResizing) => void
}

export type TCustomTableProps = {
  FiltersComponent?: ({
    setGlobalFilter,
    globalFilter
  }: {
    setGlobalFilter: any
    globalFilter: any
  }) => React.ReactElement
  asyncSortByFn?: (sortBy: SortingRule<object>[]) => void
  columns?: TColumnsProps[]
  sortServerSide?: boolean
  loadingText?: string
  minHeight?: number
  loading?: Boolean
  data?: any
  selectedItem?: TSelectedItem
  defaultSortByItem?: TSortBy | null
  setInfoResizing?: (fieldResizing: TFieldResizing) => void
}

export type THeaderProps = {
  style?: any
  colSpan?: number
  key?: string | number
  role?: string
  title?: string
  onClick?: () => Function
}

export interface TSortBy {
  id: string
  desc?: boolean | undefined
}

export type TFieldResizing = {
  [key: string]: number
}
