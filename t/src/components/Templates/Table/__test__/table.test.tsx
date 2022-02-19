import React from 'react'
import CustomTable from '../table'
import { render } from '@testing-library/react'
import { TCustomTableProps } from '../../../../typing/table'
import mockColumns from '../../../../mock/columns'
import mockData from '../../../../mock/data'

const mockDefaultProps: TCustomTableProps = {
  columns: [],
  data: []
}

const makeComponentStub = (props = mockDefaultProps) => {
  return render(<CustomTable {...props} />)
}

describe('Custom Table Component', () => {

  it('should not render filters when component is not passed through properties', () => {
    let { queryByTestId } = makeComponentStub()

    const container = queryByTestId('filters-table')
    expect(container).toBeNull();
  })

  it('should render filters when component is passed through properties', () => {
    const { getAllByTestId } = makeComponentStub({ FiltersComponent: () => (<div><input type="text" /></div>) });

    const container = getAllByTestId('filters-table')
    expect(container).toBeDefined()
  })

  it('should render container when data and column is empty', () => {
    const { getAllByTestId } = makeComponentStub()

    const container = getAllByTestId('custom-table')
    expect(container).toBeDefined()
  })

  it('should display columns from header when columns property is defined', () => {
    const { getAllByTestId } = makeComponentStub({
      columns: mockColumns,
      data: []
    })

    const container = getAllByTestId('header-columns-table')
    expect(container).toBeDefined()
  })

  it('should display data when columns and data properties are defined', () => {
    const { getAllByTestId } = makeComponentStub({
      columns: mockColumns,
      data: mockData
    })

    const container = getAllByTestId('cell-data-table')
    expect(container).toBeDefined()
  })
})
