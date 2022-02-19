import React from 'react';
import GifLoading from '../../assets/gifs/loading.gif';
import {
  Wrapper,
  Content,
  Line,
  Text,
} from './styles';

export type TLoadingPage = {
  countdownMessage?: string;
  loading: boolean;
  message?: string;
  hasImage?: boolean;
}

const LoadingPage = ({
  countdownMessage,
  loading,
  message,
  hasImage,
}: TLoadingPage) => {
  if (!loading) return null;
  return (
    <Wrapper data-testid="loading-page">
      <Content>
        <Line>
          {!!hasImage && <img src={GifLoading} alt="XP Inc - Experiência Institucional" />}
        </Line>
        {!!countdownMessage && (
          <>
            <Text>
              {countdownMessage}
            </Text>
            <br />
          </>
        )}
        {!!message && (<Text>{message}</Text>)}
      </Content>
    </Wrapper>
  );
};

export default LoadingPage;
