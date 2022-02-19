import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SocketContext from '../../../hooks/useSocket/context';
import Favorite, { TFavorite } from '..';

const propsFavoriteProps: TFavorite = {
  ticker: 'petr4',
  isFavorite: true,
};

const mockFinally = jest.fn();

const mockProviderValue: any = {
  connection: new (class {
    invoke = () => ({
      then: () => ({
        catch: () => ({
          finally: mockFinally,
        }),
      }),
    });

    on = jest.fn();
  })(),
  connected: true,
};

const makeComponentStub = (_: any, props: TFavorite) => {
  const { ticker, isFavorite } = props;
  return render(
    <SocketContext.Provider value={mockProviderValue}>
      <Favorite ticker={ticker} isFavorite={isFavorite} />
    </SocketContext.Provider>,
  );
};

describe('Favorite Component', () => {
  describe('Render', () => {
    it('should render Favorite', () => {
      expect(makeComponentStub(null, propsFavoriteProps)).toBeDefined();
    });
    it('must invoke function with click event', () => {
      const { getByTestId } = makeComponentStub(null, propsFavoriteProps);
      const favoriteComponent = getByTestId('favorite-icon');

      expect(favoriteComponent).toBeDefined();
      expect(mockFinally).toBeCalledTimes(0);

      fireEvent.click(favoriteComponent);

      expect(mockFinally).toBeCalledTimes(1);
    });
  });
});
