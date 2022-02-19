import React, { useState, useEffect } from 'react'

import Input from '../../Atoms/Input'

interface IGlobalFilterProps<D extends object> {
  preGlobalFilteredRows?: Array<D>
  globalFilter: string
  setGlobalFilter: Function
}

const GlobalFilter = ({
  globalFilter,
  setGlobalFilter
}: IGlobalFilterProps<any>) => {
  const [value, setValue] = useState(globalFilter)

  useEffect(() => setGlobalFilter(value), [value])

  return (
    <Input
      value={value || ''}
      onChange={setValue}
      placeholder="Buscar"
    />
  )
}

export default GlobalFilter
