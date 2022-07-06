import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import CreateDog from './components/CreateDog/CreateDog.jsx';
import DogDetail from './components/DogDetail/DogDetail.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/createDog' component={CreateDog}/>
      <Route exact path='/detailDog/:idDog' component={DogDetail}/>
    </div>
  );
}

export default App;
