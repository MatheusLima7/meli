import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { SomaIcon } from '@soma/react';
import { Icon } from './Styles';
import SocketContext from '../../hooks/useSocket/context';

export type TFavorite = {
  ticker: string;
  isFavorite: boolean;
};

const Favorite = ({ ticker, isFavorite }: TFavorite) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(isFavorite);
  }, [isFavorite]);

  const context = useContext(SocketContext);
  const { connection, connected } = context;

  const handle = useCallback(
    (command, callback): void => {
      if (connected && connection) {
        connection
          .invoke('Handle', command)
          .then(() => {
            if (callback) callback();
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          })
          .finally();
      }
    },
    [connected, connection],
  );

  const handleFavorite = () => {
    const currentValue = !isChecked;
    if (connected && connection) {
      if (currentValue) {
        handle({ Type: 4, CommandData: { Ticker: ticker } }, null);
      } else {
        handle({ Type: 5, CommandData: { Ticker: ticker } }, null);
      }
    }
  };

  return (
    <>
      <Icon data-testid="favorite-icon" onClick={handleFavorite}>
        <SomaIcon
          size="sm"
          icon="star-fill"
          color={isChecked ? '#FFC70A' : '#C8CACD'}
        />
      </Icon>
    </>
  );
};

export default Favorite;
