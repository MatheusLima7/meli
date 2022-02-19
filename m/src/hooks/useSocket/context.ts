import { createContext } from 'react';

import { ISocketState } from '../../typing/socket';

const SocketContext = createContext<ISocketState>(undefined!);

export default SocketContext;
