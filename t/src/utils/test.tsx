import React, { ReactElement } from 'react'
import { render as useRender } from '@testing-library/react'

const render = (
  component: ReactElement<any>,
  { initialState = {}, ...renderOptions } = {}
) => {
  return useRender(component, { ...renderOptions })
}

const CustomHook = ({ callback }) => {
  callback()
  return null
}

export const renderHook = (
  callback: Function,
  { initialState = {} as Partial<any> } = {}
) => {
  render(<CustomHook callback={callback} />, { initialState })
}

export * from '@testing-library/react'
export { render }
