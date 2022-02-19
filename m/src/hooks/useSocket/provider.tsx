import React,
{
  ReactElement,
  useContext,
  useState,
  useEffect,
} from 'react';
import { ISocketProviderProps } from '../../typing/socket';
import LoadingPage from '../../components/LoadingPage';
import SocketContext from './context';
import useSocket from '.';
import { AuthContext } from '../useAuthenticate';

const SocketProvider = ({ children }: ISocketProviderProps): ReactElement => {
  const authContext = useContext(AuthContext);
  const socket = useSocket();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!socket.connected || !authContext.user);
  }, [
    socket.connected,
    authContext.user,
  ]);

  return (
    <>
      <LoadingPage hasImage message={socket.message} loading={loading} />
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </>
  );
};

export default SocketProvider;
