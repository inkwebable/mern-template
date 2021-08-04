import { MqttClient as mqtt } from 'mqtt';
import { createContext } from 'react';

export type MqttClient = mqtt | null;

export interface ClientStateModel {
  client?: MqttClient | null;
  clientStatus: string | Error;
}

const initialSessionState: ClientStateModel = {
  client: null,
  clientStatus: '',
};

export const ClientContext = createContext<ClientStateModel>(initialSessionState);
