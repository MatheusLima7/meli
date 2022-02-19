import React, { useState, useEffect } from 'react'

import Message from '../../Molecules/Message'
import CustomTable from './table'
import { TTableProps, TColumnsProps } from '../../../typing/table'
import { Wrapper } from './styles'

const handleTableValues = (data: any) => {
  if (!data) return null

  return data.map((row: any) => {
    const newObject = { ...row }
    const paramsArray = Object.keys(row)
    paramsArray.forEach((param) => {
      if (!newObject[param] && newObject[param] !== false)
        newObject[param] = '-'
    })
    return newObject
  })
}

const Table = ({
  loadingText = 'Carregando...',
  FiltersComponent,
  loading = false,
  sortServerSide,
  hidden = false,
  error = false,
  asyncSortByFn,
  columns = [],
  minHeight,
  data = [],
  selectedItem,
  defaultSortByItem,
  setInfoResizing
}: TTableProps) => {
  const [currentColumns, setCurrentColumns] = useState<TColumnsProps[]>([])
  const [currentData, setCurrentData] = useState<any>()

  useEffect(() => {
    setCurrentColumns(columns)
    setCurrentData(handleTableValues(data))
  }, [data, columns])

  if (hidden) return null

  const handlerView = () => {
    if (!loading && error)
      return (
        <Wrapper data-testid='message-error-table-500'>
          <Message>
            Desculpe, houve um erro ao trazer os dados. Tente novamente.
          </Message>
        </Wrapper>
      )

    if (!loading && !currentData?.length)
      return (
        <Wrapper data-testid='message-error-table-empty'>
          <Message>Nenhum dado foi encontrado</Message>
        </Wrapper>
      )

    return (
      <CustomTable
        FiltersComponent={FiltersComponent}
        sortServerSide={sortServerSide}
        asyncSortByFn={asyncSortByFn}
        loadingText={loadingText}
        columns={currentColumns}
        minHeight={minHeight}
        data={currentData}
        loading={loading}
        selectedItem={selectedItem}
        defaultSortByItem={defaultSortByItem}
        setInfoResizing={setInfoResizing}
      />
    )
  }

  return <Wrapper data-testid='wrapper-table'>{handlerView()}</Wrapper>
}

export default { Table }
