import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Inventory from './Inventory.jsx';
import '../styles/css/main.css'
import Instagram from './Instagram.jsx';
import Style from './Style.jsx';
import Favorites from './Favorites.jsx';
import { Switch, Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: false,
      isLoggedIn: false,
      imageUrl: '',
      user: '',
      inventory: [], 
      brands: [],
      instagramResults: [],
      currentPage: 'home'
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleImageUrl = this.handleImageUrl.bind(this);
    this.loadStylePage = this.loadStylePage.bind(this);
    this.loadHomePage = this.loadHomePage.bind(this);
    this.loadFavoritesPage = this.loadFavoritesPage.bind(this);
    this.handleAppBrandChange = this.handleAppBrandChange.bind(this);
  }

  componentDidMount() {
    // check if there is an active user session
    axios.get('/auth/current_user')
      .then((result) => this.setState({user: result.data, isLoggedIn: true}))
      .then(() => {
        // if there is an active user session, pull user's instagram photos
        if (this.state.user) {
          axios.get('/auth/media')
          .then((result) => {this.setState({instagramResults: result.data.data})})
        }
      })
  }

  handleLogin() {
    this.setState({showLoginModal: !this.state.showLoginModal});
  }

  handleStateChange(key, val) {
    let brands = val.map(({brandName}) => brandName)
    let filteredBrands = [...new Set(brands)]
    let arrOfObjs = filteredBrands.map((name) => {
      return {brandName: name, isSelected: false}
    })

    this.setState({[key]: val, brands: arrOfObjs})
  }

  async handleAppBrandChange(val) {
    console.log(val)
    await this.setState({brands: val})
  }

  handleImageUrl(e) {
    this.setState({
      imageUrl: e.target.value
    })
  }

  loadStylePage() {
    this.setState({
      currentPage: 'style'
    })
  }

  loadHomePage() {
    this.setState({
      currentPage: 'home'
    })
  }

  loadFavoritesPage() {
    this.setState({
      currentPage: 'favorites'
    })
  }

  render() {
    return (
      <div>
      <NavBar user={this.state.user}
      currentPage={this.state.currentPage}
      loadStylePage={this.loadStylePage}
      loadHomePage={this.loadHomePage}
      loadFavoritesPage={this.loadFavoritesPage}/>
        <div style={{margin: "30px"}}>
          <div>
            <Switch>
              <Route exact path='/'
                render={(props) => <Inventory {...props}
                handleStateChange={this.handleStateChange}
                handleImageUrl={this.handleImageUrl}
                imageUrl={this.state.imageUrl}
                inventory={this.state.inventory}
                brands={this.state.brands}
                username={this.state.user}/>}/>
              <Route exact path='/style'
                render={(props) => <Style {...props}
                username={this.state.user}/>}/>
              <Route exact path='/favorites'
                render={(props) => <Favorites {...props}
                username={this.state.user}/>}/>
              <Route exact path='/insta'
                render={(props) => <Instagram {...props}
                photos={this.state.instagramResults}
                username={this.state.user}/>}/>
            </Switch>
          </div>
      </div>
        {/* <Instagram photos={this.state.instagramResults}/> */}
      </div>
    )
  }
}

export default App