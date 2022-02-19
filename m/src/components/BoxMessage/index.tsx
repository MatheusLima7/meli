import React, { useContext } from 'react';
import { SomaIcon } from '@soma/react';

import {
  BoxMessage,
  CloseIcon,
  Message,
  Wrapper,
  Title,
} from './Styles';
import { TNotification, GlobalNotificationContext } from '../../hooks/useGlobalNotification';

export default () => {
  const notificationContext = useContext(GlobalNotificationContext);

  if (!notificationContext.notifications) return null;

  return (
    <Wrapper>
      {notificationContext.notifications.map((notification: TNotification) => (
        <BoxMessage key={notification.id} typeMessage={notification.type} data-testid="box-message">
          <div>
            <Title data-testid="title">{notification.title}</Title>
            <Message data-testid="message">{notification.message}</Message>
          </div>
          <CloseIcon
            data-testid="close-icon"
            onClick={() => {
              if (notification.id) {
                notificationContext.close(notification.id);
              }
            }}
          >
            <SomaIcon size="sm" icon="close" color="#FFF" />
          </CloseIcon>
        </BoxMessage>
      ))}
    </Wrapper>
  );
};
