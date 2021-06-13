
import './App.css';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import fire from './service/fire'

import Profile from './components/pages/Profile';
function App(){

  



   /* const clearInputs = () => {

      setPassword("");
      setEmail("");
    }

    const clearErrors = () => {

      setEmailError("");
      setPassword("");
    }

*/
    
    return (
      
      <Router>
        <Navbar/>

        <Switch>
          
          <Route path ="/" exact  component={Home} />
          <Route path ="/sign-in" exact  component={Login} />
          <Route path="/profile" exact component = {Profile}/> 
       
        </Switch>

      </Router>
    
    );

  
}

export default App;
