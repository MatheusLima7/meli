import React from 'react'
import { FaSpinner } from 'react-icons/fa'

import { Wrapper } from './styles'

const Spimner: React.FC = () => (
  <Wrapper data-testid='loading-table'>
    <FaSpinner color='#fff' />
  </Wrapper>
)

export default Spimner
