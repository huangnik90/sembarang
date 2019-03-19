import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/product'
import Cart from './components/cart'
import ManageProduct from './components/manageProduct'
import PageNotFound from './components/404'
import ProductDetail from './components/productDetail'
import History from './components/history'
import {keepLogin} from './1.actions'
import {connect} from 'react-redux'
//withRouter buat sambung ke reducer dengan connect, tapi ada komponent <Route> (Routing)
import { Route,withRouter,Switch } from 'react-router-dom'
import './App.css';
import cookie from 'universal-cookie'
import ScrollTop from './components/scrollToTop'

const kookie = new cookie()
class App extends Component {
  //AKAN KE TRIGGER SETIAP REFRESH
  componentDidMount(){
      var usernameCookie = kookie.get('userData')
      if (usernameCookie!== undefined){
        this.props.keepLogin(usernameCookie)
      }
    
  }
  
  render() {
    return (
      <div>
        <ScrollTop>
            <Navbar/>
              <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/login' component={Login} />
                <Route path='/cart' component={Cart} />
                <Route path='/register' component={Register} />
                <Route path='/product' component={Product} />
                <Route path='/productdetail/:terserah' component={ProductDetail} />
                <Route path='/addproduct' component={ManageProduct} />
                <Route path='/history' component={History} />
                <Route path='*' component={PageNotFound} />
              </Switch>
        </ScrollTop>

      </div>
    );
  }
}


export default withRouter (connect(null,{keepLogin})(App));
