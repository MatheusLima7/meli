import React, { ReactNode } from 'react'

import P from '../../Atoms/P'
import { Wrapper } from './styles'

type TMessageProps = {
  children?: ReactNode
  testId?: string
}

const Message = ({ children, testId = '' }: TMessageProps) => (
  <Wrapper data-testid={`message-error-table-${testId}`}>
    <P>{children}</P>
  </Wrapper>
)

export default Message
