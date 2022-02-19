import React from 'react'

import { Wrapper } from './styles'

const Input = ({
  onChange,
  placeholder,
  field,
}: any) => (
  <Wrapper
    onChange={(e) => onChange(field, e.target.value)}
    placeholder={placeholder}
  />
)

export default Input
