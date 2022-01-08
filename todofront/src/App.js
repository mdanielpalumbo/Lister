import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Container} from './Container/Container'
import { ItemsProvider } from './Context/ItemsContext';
import './styles/styles.scss'

function App() {
  return (
    <ItemsProvider>
      <Container/>
    </ItemsProvider>
  );
}

export default App;
