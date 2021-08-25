import './App.css'
import Input from './components/Input';
import { Route } from 'react-router';
import New from './components/New';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Input}/>
      <Route exact path="/new" component={New}/>
    </div>
  );
}

export default App;
