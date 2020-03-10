import { createContext } from 'react';

import { hasSession } from './hasSession';

export interface SessionStateModel {
  session: boolean;
  updateSession: (session: boolean) => void;
}

const initialSessionState: SessionStateModel = {
  session: hasSession(),
  updateSession: () => {},
};

export const SessionContext = createContext<SessionStateModel>(initialSessionState);
