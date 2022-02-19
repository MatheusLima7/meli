import React from 'react'
import { Table } from '../../../../'
import { render } from '@testing-library/react'
import { TTableProps, TColumnsProps } from '../../../../typing/table'

const mockDefaultProps: TTableProps = {
  columns: [],
  data: [],
  loading: false,
  error: false
}

const makeComponentStub = (props = mockDefaultProps) => {
  return render(<Table {...props} />)
}

describe('Table Component', () => {
  it('should render container', () => {
    const { getAllByTestId } = makeComponentStub()

    const container = getAllByTestId('wrapper-table')
    expect(container).toBeDefined()
  })

  describe('should display the message error', () => {
    it('when error property is true and loading property is false', () => {
      const { getAllByTestId } = makeComponentStub({
        columns: [],
        data: [],
        loading: false,
        error: true
      })

      const container = getAllByTestId('message-error-table-500')
      expect(container).toBeDefined()
    })
  })

  describe('should display the message empty', () => {
    it('when data is empty and error and loading is false', () => {
      const { getAllByTestId } = makeComponentStub({
        columns: [],
        data: [],
        loading: false,
        error: false
      })

      const container = getAllByTestId('message-error-table-empty')
      expect(container).toBeDefined()
    })
  })
})
