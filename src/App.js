import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import TekkenGuide from './components/Tekken-guides';
import NewCharacter from './components/pages/NewCharacter';
import Login from './components/Login';
import Banner from './components/layouts/Banner';
import Header from './components/layouts/Header';
import axios from 'axios';
import check from './assets/check.png';
import ChosenPage from './components/pages/ChosenPage';
import AOS from 'aos'
import Register from './components/Register';

class App extends Component {
  state= {
    characters: [{}],
    users: [{}],
    newUser: {},
    login: {},
    newCharacter: {},
    currentCharacter: {},
    updatedCharacter: {},
    alert: "notshown",
    count: 0,
    keymove: false,
    visible: false,
    visibleRegister: false,
    errorMessage: "",
    overlay: "overlay",
    characterVisible: false,
    loggedIn: false,
  };
  alertInterval = () =>{
    setInterval(() => {
      if(this.state.count >= 6){
        this.setState({alert: "notshown"})
        clearInterval(this.alertInterval())
      }
      else{
        this.setState({alert: "alert"});
        this.setState({ count: this.state.count + 1 });
        console.log(this.state.count);
      }
    }, 1000);
  }
  setCurrentCharacter = value => {
    this.setState({currentCharacter: value});
  }
  setUpdatedCharacter = value => {
    this.setState({updatedCharacter: value});
  }
  setKeymove = value => {
    this.setState({keymove: value});
  }
  setLogin = value => {
    this.setState({login: value});
  }
  setVisibility = value => {
    this.setState({visible: value});
  }
  setVisibilityRegister = value => {
    this.setState({visibleRegister: value});
  }
  setNewCharacter = values => {
    this.setState({newCharacter: values})
  }
  setNewVisible = value => {
    this.setState({characterVisible: value})
  }
  setLoggedIn = value => {
    this.setState({loggedIn: value});
  }
  setNewUser = value => {
    this.setState({newUser: value});
  }
  componentDidMount() {
    AOS.init();
    axios
      .get('http://localhost:2000/characters')
      .then(res => this.setState({ characters: res.data}));
    axios
      .get('http://localhost:2000/users')
      .then(res => this.setState({ users: res.data }));
  }
  validateToken = () => {
    axios.post('http://localhost:2000/users/login', this.state.login)
    .then(res => {
      this.componentDidMount();
      this.setState({loggedIn: true});
      this.setState({visible: false});
      this.setState({login: {}})
      localStorage.setItem("token", "Bearer " + res)
    })
    .catch(error => {
      this.setState({errorMessage: "No user is found."})
    })
  };
  registerUser = () => {
    axios.post('http://localhost:2000/users/register', this.state.newUser)
    .then(res => {
      this.setState({loggedIn: true});
      this.setState({newUser: {}});
      this.setState({visibleRegister: false});
    })
  }
  addCharacter = (value) => {
    axios
      .post('http://localhost:2000/characters', this.state.newCharacter)
      .then(response =>{
        this.setState({characterVisible: false});
        this.componentDidMount();
        this.alertInterval();
      })
      .catch(error => { 
        this.setState({errorMessage: "Check if every box has a value."})
        console.log(error)
      })
  };
  updateCharacter = async (id, value)=> {
    await this.setUpdatedCharacter(value);
    axios.put(`http://localhost:2000/characters/${id}`, this.state.updatedCharacter)
    .then(res => {
      console.log("het werkt");
      this.componentDidMount();
    })
    .catch(error => {
      console.log(error);
    })
  }
  render(){
  return (
    <Router>
      <Switch>
      <Route exact path="/" render={props => (
        <React.Fragment>
          <div className="App">
            <div className={this.state.visible || this.state.characterVisible || this.state.keymove || this.state.visibleRegister ? "overlay" : null}>
              <div className={this.state.alert}>
                <img src={check} alt="check"/>
                <p>Character was succesfully added !</p>
              </div>
              <Banner setVisibility={this.setVisibility} loggedIn={this.state.loggedIn} users={this.state.users} setVisibilityRegister={this.setVisibilityRegister}/>
              {this.state.visibleRegister ? <Register users={this.state.users} setVisibilityRegister={this.setVisibilityRegister} errorMessage={this.state.errorMessage} registerUser={this.registerUser} setNewUser={this.setNewUser}/> : null}
              {this.state.visible ? <Login users={this.state.users} setLoggedIn={this.setLoggedIn} setVisibility={this.setVisibility} setLogin={this.setLogin} errorMessage={this.state.errorMessage} validateToken={this.validateToken}/> : null}
              {this.state.characterVisible ? <NewCharacter setNewVisible={this.setNewVisible} addCharacter={this.addCharacter} setNewCharacter={this.setNewCharacter} errorMessage={this.state.errorMessage}/> : null}
              <TekkenGuide characters={this.state.characters} deleteKeymove={this.deleteKeymove} loggedIn={this.state.loggedIn} setUpdatedCharacter={this.setUpdatedCharacter} 
              updateCharacter={this.updateCharacter} setKeymove={this.setKeymove} setCurrentCharacter={this.setCurrentCharacter} currentCharacter={this.state.currentCharacter} userAuthenticated={this.userAuthenticated}/>
            </div>
          </div>
        </React.Fragment>
      )} />
        <Route path="/:id" render={(props) => <ChosenPage {...props} updateCharacter={this.updateCharacter} setKeymove={this.setKeymove}/>}/>
      </Switch>
    </Router>
  );
  }
}

export default App;
