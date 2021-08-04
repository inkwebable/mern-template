import { useCallback, useContext, useEffect, useState } from 'react';

import { ClientContext, MqttClient } from './clientContext';
import { getMqttData } from './utils/getMqttData';

interface IMsgObj {
  topic: string;
  message: any;
}

interface IUseMqttSubsciption {
  topics: string | string[];
  topic: string | null;
  client?: MqttClient | null;
  message?: any;
  messageObj: IMsgObj | undefined;
}

export default function useMqttSub(topics: string | string[], options = {}): IUseMqttSubsciption {
  const [messageObj, setMessageObj] = useState<IMsgObj>();
  const [message, setMessage] = useState<any>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const { client } = useContext(ClientContext);

  const subscribe = () => {
    client?.subscribe(topics);
  };

  const unSubscribe = () => {
    client?.unsubscribe(topics);
  };

  const onMessage = useCallback((msgTopic: string, message: Buffer) => {
    console.log('message', message);
    if (msgTopic === topic || topics.indexOf(msgTopic) !== -1) {
      setTopic(msgTopic);
      setMessage(getMqttData(message));
      setMessageObj({
        topic: msgTopic,
        message: message,
      });
    }
  }, []);

  useEffect(() => {
    console.log('sub?', client);
    if (client?.connected) {
      console.log('subbing');
      subscribe();
    }

    return () => {
      unSubscribe();
    };
  }, [client]);

  useEffect(() => {
    if (client) {
      client.on('message', onMessage);
    }

    return () => {
      if (client) {
        client.off('message', onMessage);
      }
    };
  }, [client, onMessage]);

  return {
    client,
    message,
    topics,
    topic,
    messageObj,
  };
}
