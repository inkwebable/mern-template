import { connect, IClientOptions } from 'mqtt';
import { MqttClient } from 'mqtt/types/lib/client';
import React, { FunctionComponent, useEffect, useState } from 'react';

import { ClientContext } from './clientContext';

interface IMqttConnectorProps {
  url?: string;
  options?: IClientOptions;
}

const MqttConnector: FunctionComponent<IMqttConnectorProps> = ({ children, url = 'ws://localhost:8883', options }): JSX.Element => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [clientStatus, setClientStatus] = useState<string | Error>('');
  const [hasClient, updateHasClient] = useState(false);

  useEffect(() => {
    if (!hasClient) {
      const mqttClient = connect(url, options);
      mqttClient.on('connect', function () {
        updateHasClient(true);
        setClient(mqttClient);
        setClientStatus('connected');
      });
      mqttClient.on('reconnect', function () {
        setClientStatus('reconnecting');
      });
      mqttClient.on('error', function (error) {
        setClientStatus(error?.message);
      });
      mqttClient.on('offline', function () {
        setClientStatus('offline');
      });
      mqttClient.on('end', function () {
        setClientStatus('end');
      });
    }

    return () => {
      client?.end(true);
    };
  }, [hasClient]);

  return <ClientContext.Provider value={{ client, clientStatus }}>{children}</ClientContext.Provider>;
};

export default MqttConnector;
