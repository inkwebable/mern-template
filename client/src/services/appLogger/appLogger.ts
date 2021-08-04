import axios from 'axios';
import { MqttClient } from 'mqtt/types/lib/client';

export type logLevel = 'info' | 'warning' | 'error' | 'fatal';

type IAppMessage = string | number | Record<string, unknown>;

export interface IAppLogEntry {
  level: logLevel;
  message: IAppMessage;
}

interface IAppLoggerOptions {
  url?: string;
  sendToUrl?: boolean;
  sendToWs?: boolean;
  logToConsole?: boolean;
  traceConsoleLogs?: boolean;
  mqttClient?: MqttClient;
}

class AppLogger {
  private static instance: AppLogger;
  private logStore: IAppLogEntry[] = [];
  private readonly url = process.env.REACT_APP_LOGGER_URL;
  private wsAddress = process.env.REACT_APP_LOGGER_WS_ADDRESS;
  private sendToUrl = false;
  private readonly logToConsole = process.env.NODE_ENV === 'development';
  private sendToWs = false;
  private traceConsoleLogs = false;
  private mqttClient: MqttClient | null;
  private constructor(options?: IAppLoggerOptions) {
    this.mqttClient = null;

    if (options) {
      if (options.url) {
        this.url = options.url;
      }

      if (options.sendToUrl) {
        this.sendToUrl = options.sendToUrl;
      }

      if (options.logToConsole) {
        this.logToConsole = options.logToConsole;
      }

      if (options.traceConsoleLogs) {
        this.traceConsoleLogs = options.traceConsoleLogs;
      }

      if (options.sendToWs) {
        this.sendToWs = options.sendToWs;
      }

      if (options.mqttClient) {
        this.mqttClient = options.mqttClient;
      }
    }
  }

  public static getInstance(options?: IAppLoggerOptions): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = options ? new AppLogger(options) : new AppLogger();
    }
    return AppLogger.instance;
  }

  public setSendToUrl(bool = true): void {
    this.sendToUrl = bool;
  }

  public setSendToWs(bool = true): void {
    this.sendToWs = bool;
  }

  public setMqttClient(client: MqttClient): void {
    this.mqttClient = client;
  }

  public setMqttClientUrl(wsAddress: string): void {
    this.wsAddress = wsAddress;
  }

  private log(level: logLevel, message: any): IAppLogEntry {
    const entry = { level, message };
    if (this.sendToUrl && this.url) {
      axios.post(this.url, entry);
    }

    if (this.sendToWs && this.wsAddress && this.mqttClient) {
      this.mqttClient.publish(`${this.wsAddress}/${level}`, message);
    }

    if (this.logToConsole) {
      if (this.traceConsoleLogs) {
        // eslint-disable-next-line no-console
        console.trace(message);
      } else {
        // eslint-disable-next-line no-console
        level === 'error' ? console.error(message) : level === 'warning' ? console.warn(message) : console.log(message);
      }
    }

    this.logStore.push(entry);
    return entry;
  }

  public info(message: IAppMessage): void {
    this.log('info', message);
  }

  public warning(message: IAppMessage): void {
    this.log('warning', message);
  }

  public error(message: IAppMessage): void {
    this.log('error', message);
  }

  public fatal(message: IAppMessage): void {
    this.log('fatal', message);
  }

  public getSessionLog(filter?: logLevel): IAppLogEntry[] {
    if (filter) {
      return this.logStore.filter((item: IAppLogEntry) => item.level === filter);
    } else {
      return this.logStore;
    }
  }

  public clearLogStore(): void {
    this.logStore = [];
  }
}

export default AppLogger;
