import React from 'react';
import axios from 'axios';

import NavBar from './NavBar.jsx';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
import Header from '../components/Header.jsx'
import '../styles/css/main.css'
import Modal from '@material-ui/core/Modal';
import UploadComponent from './UploadComponent.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: false,
      isLoggedIn: false,
      user: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({showLoginModal: !this.state.showLoginModal});
  }

  componentDidMount() {
    axios.get('/auth/current_user')
      .then((result) => 
      this.setState({user: result.data, isLoggedIn: true}));
  }


  render() {
    return (
      <div>
      <NavBar isLoggedIn={this.state.isLoggedIn}/>
        <div style={{margin: "30px"}}>
          <div>
              <Inventory 
              handleStateChange={this.handleStateChange} 
              inventory={this.state.inventory} brands={this.props.brands}
              brands={this.state.brands}/>
            </div>
        </div>      

      </div>
      )
  }
}

export default App