
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes } from './components/Routes';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;