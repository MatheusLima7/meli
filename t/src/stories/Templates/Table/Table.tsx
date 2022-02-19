import React from 'react'

import Custom from '../../../components/Templates/Table'

interface IDataProps {}

interface ISchemaProps {
  type: string
  label: string
}

export interface ITableProps {
  schema?: ISchemaProps[]
  data: IDataProps[]
}

/**
 * Célula que recebe conteúdo
 */
const StoryTable = () => (
  <Custom.Table
    schema={[{ type: 'teste-type', label: 'teste-label' }]}
    data={[{ name: 'data-hkdjgdfj' }]}
  />
)

export default StoryTable
