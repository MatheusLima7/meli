import React, { Fragment } from 'react'
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'

interface ISortColumn {
  isDesc?: boolean
}

const SortColumn = ({ isDesc }: ISortColumn) => {
  return <Fragment>{isDesc ? <BsArrowDown /> : <BsArrowUp />}</Fragment>
}

export default SortColumn
