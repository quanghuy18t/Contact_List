import { Provider } from 'react-redux';
import StackNavigation from './src/navigator/StackNavigation';
import store from './src/store/store';
import './src/i18n/i18n.config';

export default function App() {
  return (
    <Provider store={store} stabilityCheck='never'>
      <StackNavigation />
    </Provider>
  );
}