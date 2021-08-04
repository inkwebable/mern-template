import { createBrowserHistory } from 'history';

let history;

export default function getHistory() {
  if (!history) {
    history = createBrowserHistory();
  }
  return history;
}
