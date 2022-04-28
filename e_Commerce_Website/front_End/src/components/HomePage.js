import React, { Component } from "react";
import ProductTable from './ProductTable';
import SignIn from './SignIn'
import Layout from './Layout'
import { Typography, Button } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



// CSRF Token Getter

function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();

          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

              break;
          }
      }
  }

  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Drawer stuff
const drawerWidth = 240;


export default class HomePage extends Component {
  constructor(props){
    super(props)
    this.state ={
      stateProc : 1,
      pageID : 1,
      loggedIn : false,

      fetchInfoComplete : false,
      storeProducts : [],

      productsTemp : [],
      products : new Map(),

      manufacturersTemp : [],
      manufacturers : new Map(),

      memberInfo : null,

      // Each item, Should contain complete info (basically copy of product)
      cart : [],


      storeNumber : 1,
      memberAddresses : [],
      memberCards : [],
    }

    // Handler Binding
    this.addToCart = this.addToCart.bind(this)
    this.clickHomePage = this.clickHomePage.bind(this)
    this.clickAccountInformation = this.clickAccountInformation.bind(this)
    this.clickLogOut = this.clickLogOut.bind(this)
    this.clickManageAddresses = this.clickManageAddresses.bind(this)
    this.clickManageCards = this.clickManageCards.bind(this)
    this.clickOrderHistory = this.clickOrderHistory.bind(this)
    this.clickShoppingCart = this.clickShoppingCart.bind(this)
    this.clickSignIn = this.clickSignIn.bind(this)
    this.clickSignUp = this.clickSignUp.bind(this)
  }

  

componentDidMount(){
  this.fetchCompleteInfo()
  this.fetchStoreProducts()
}

render(){
    switch (this.state.pageID){
      //HomePage
      case 1:
    
        // Making sure that Products, Manufacturers and storeProducts has been populated
        if(this.state.fetchInfoComplete && (this.state.storeProducts.length != 0)){
          return(
            <Layout 
            clickAccountInformation = {this.clickAccountInformation}
            clickLogOut = {this.clickLogOut}
            clickManageAddresses = {this.clickManageAddresses}
            clickManageCards = {this.clickManageCards}
            clickOrderHistory = {this.clickOrderHistory}
            clickShoppingCart = {this.clickShoppingCart}
            clickSignIn = {this.clickSignIn}
            clickHomePage = {this.clickHomePage}>
            <div>
              <div sx ={{display : 'flex'}}>
                <ProductTable 
                products = {this.state.products}
                manufacturers = {this.state.manufacturers}
                manufacturersTemp = {this.state.manufacturersTemp}
                storeProducts = {this.state.storeProducts}
                addToCart = {this.addToCart}/>
                <br />
                {/*Checkout button*/}
                <Button variant="contained" endIcon = {<KeyboardDoubleArrowRightIcon/>}>
                    Check out 
                </Button>
                </div> 
              </div>
              </Layout>);
        }else{
          return(<Typography variant = "h2">
                  Loading...
                </Typography>)
        }


      //Cart
      case 2:
        return (<Layout 
          clickAccountInformation = {this.clickAccountInformation}
          clickLogOut = {this.clickLogOut}
          clickManageAddresses = {this.clickManageAddresses}
          clickManageCards = {this.clickManageCards}
          clickOrderHistory = {this.clickOrderHistory}
          clickShoppingCart = {this.clickShoppingCart}
          clickSignIn = {this.clickSignIn}
          clickHomePage = {this.clickHomePage}>
              <h1> CART </h1>
               </Layout>)
        
      //Account Information
      case 3:
        return (<Layout 
          clickAccountInformation = {this.clickAccountInformation}
          clickLogOut = {this.clickLogOut}
          clickManageAddresses = {this.clickManageAddresses}
          clickManageCards = {this.clickManageCards}
          clickOrderHistory = {this.clickOrderHistory}
          clickShoppingCart = {this.clickShoppingCart}
          clickSignIn = {this.clickSignIn}
          clickHomePage = {this.clickHomePage}>
            <h1> ACCOUNT INFORMATION</h1>
            </Layout>)

      //ManageCards
      case 31:
        return (<Layout 
          clickAccountInformation = {this.clickAccountInformation}
          clickLogOut = {this.clickLogOut}
          clickManageAddresses = {this.clickManageAddresses}
          clickManageCards = {this.clickManageCards}
          clickOrderHistory = {this.clickOrderHistory}
          clickShoppingCart = {this.clickShoppingCart}
          clickSignIn = {this.clickSignIn}
          clickHomePage = {this.clickHomePage}>
            <h1> MANAGE CARDS </h1>
            </Layout>)

      //ManageAddresses  
      case 32:
        return (<Layout 
          clickAccountInformation = {this.clickAccountInformation}
          clickLogOut = {this.clickLogOut}
          clickManageAddresses = {this.clickManageAddresses}
          clickManageCards = {this.clickManageCards}
          clickOrderHistory = {this.clickOrderHistory}
          clickShoppingCart = {this.clickShoppingCart}
          clickSignIn = {this.clickSignIn}
          clickHomePage = {this.clickHomePage}>
            <h1> MANAGE ADDRESSES </h1>
            </Layout>)

      //OrderHistory
      case 33:
        return (<Layout 
          clickAccountInformation = {this.clickAccountInformation}
          clickLogOut = {this.clickLogOut}
          clickManageAddresses = {this.clickManageAddresses}
          clickManageCards = {this.clickManageCards}
          clickOrderHistory = {this.clickOrderHistory}
          clickShoppingCart = {this.clickShoppingCart}
          clickSignIn = {this.clickSignIn}
          clickHomePage = {this.clickHomePage}>
            <h1> ORDER HISTORY </h1>
            </Layout>)

      //SignIn
      case 4:
        return (<SignIn />)
        

      //SignUp
      case 5:
        return (<h1> SIGN UP </h1>)
        
      //CheckOut  
      case 6:
        return (<h1> CHECKOUT </h1>)
      default:
        return (<h1> Whoops! Something went wrong...</h1>)

    }
  }
  // HANDLERS
  fetchStoreProducts(){
    let requestOptions = {
      credentials : 'include',
      method : 'POST',
      headers : {'Content-Type' : 'application/json', 
                 'X-CSRFToken': csrftoken},
      body : JSON.stringify({s : this.state.storeNumber })
    }
      fetch('/api/StoreInventoryView/', requestOptions)
      .then((response) => response.json())
      .then((data) => {this.setState({storeProducts : data})})
    
  }

  async fetchCompleteInfo(){
    
    Promise.all([
      await fetch('/api/GetProductView/')
      .then((response) => response.json())
      .then((data) => {this.setState({productsTemp : data})}),
      await fetch('/api/GetManufacturerView')
      .then((response) => response.json())
      .then((data) => {this.setState({manufacturersTemp : data})})
      
    ])

      // Mapping Products to their IDs
      for(const product of this.state.productsTemp){
        this.state.products.set(product.p_id, product)
      }

      // Mapping Manufacturers to their IDs
      for(const manufacturer of this.state.manufacturersTemp){
        this.state.manufacturers
        .set(manufacturer.manufacturer_id, manufacturer)
      }

      this.setState({
        fetchInfoComplete : true
      })
  }

  addToCart(p_name, category, manufacturer, quantity, price, p_id, manufacturer_id){
        // BUT, first subtract from the storeProducts

        for(let i = 0; i < this.state.storeProducts.length ; i++){
          if(this.state.storeProducts[i].p == p_id){
            const storeProducts = this.state.storeProducts.slice();
            storeProducts[i].quantity = storeProducts[i].quantity - quantity;
            
            this.setState({
              storeProducts : storeProducts,
              stateProc : (this.state.stateProc + 1)
            })
          }
        }

        // TODO, check if product exists, just add to quantity
        for (let i = 5; i < this.state.cart.length; i = i + 7) {
          if(this.state.cart[i] == p_id){
            const cart = this.state.cart.slice();
            cart[i-2] = cart[i-2] + quantity
            this.setState({
              cart : cart,
              stateProc : (this.state.stateProc + 1)
            })
            return
          }
        }

        this.setState({
        cart : this.state.cart.concat(new Array(p_name, category, manufacturer, quantity, price, p_id, manufacturer_id)),
        stateProc : (this.state.stateProc + 1)
        //Adjust Store Inventory
        })
  }

  clickHomePage(){
    this.setState({
      pageID : 1
    })
  }

  clickSignIn(){
    this.setState({
      pageID : 4
    })
  }

  clickSignUp(){
    this.setState({
      pageID : 5
    })
  }

  clickLogOut(){
    this.setState({
      loggedIn : false
    })

  }

  clickShoppingCart(){
    this.setState({
      pageID : 2
    })

  }

  clickAccountInformation(){
    this.setState({
      pageID : 3
    })

  }

  clickManageCards(){
    this.setState({
      pageID : 31
    })

  }
  clickManageAddresses(){
    this.setState({
      pageID : 32
    })
  }
  clickOrderHistory(){
    this.setState({
      pageID : 33
    })
  }

  
}


