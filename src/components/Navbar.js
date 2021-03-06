import React,  { Component } from 'react';
import { DropdownMenu,DropdownToggle,UncontrolledDropdown,Collapse, DropdownItem,Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import cookie from 'universal-cookie'
import {resetUser} from '../1.actions'
// import axios from 'axios'

const kokie = new cookie()
class HeaderKu extends Component{
    // state = {cartLength:0}

    // componentDidUpdate(){
    //     this.renderCartLength()
    // }

    
    // renderCartLength=()=>{
    //     axios.get('http://localhost:2000/cart')
    //     .then((res)=>{
    //         var cartLength=0
    //         res.data.map((val)=>{
    //             cartLength+=val.quantity
    //         })
    //         this.setState({cartLength:cartLength})
    //     })
    //     .catch((err)=>console.log(err))
    // }

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
      };
    }
    toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }
    btnSignOut =()=>{
        kokie.remove("userData")
        this.props.resetUser()
        
    }
    render(){ 
        if(this.props.username===""){
            return(
                <div style={{marginBottom:"75px"}}>
                    <Navbar color="light" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                                </NavItem>
                                
                                <NavItem>
                                    <Link to="/register"><NavLink className="btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i className="fas fa-sign-in-alt" /> Masuk</NavLink></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        }else{
            return(
                <div style={{marginBottom:"75px"}}>
                    <Navbar color="light" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                                </NavItem>
                                
                                <NavItem>
                                   <NavLink>{this.props.pass} Hi, {this.props.username}</NavLink>
                                </NavItem>
                                <NavItem>
                                <Link to="/cart"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i class="fas fa-shopping-cart"/> {this.props.cart} Cart </NavLink></Link>
                                </NavItem>
                                <NavItem>
                                <Link to="/Product"><NavLink className="btn btn-default" style={{fontSize:"14px"}}><i class="fas fa-tags"/> Product </NavLink></Link>
                                </NavItem>
                                                           
                                
                                <NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Menu
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        <DropdownItem>
                                           <Link to="/history" >History Transaction</Link>
                                        </DropdownItem>
                                        {this.props.role==="admin" ?
                                        <DropdownItem>
                                        <Link to="/addproduct"> Manage Item</Link>
                                        </DropdownItem>:null}
                                        <DropdownItem>
                                            Edit Profile
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.btnSignOut}>
                                        <Link to="/">
                                        <i className="fas fa-sign-out-alt" /> Sign Out
                                        </Link>
                                        
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                               
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );

        }
           
        }
}
const mapStateToProps = (state) =>{
    return {
        username : state.user.username,
        id : state.user.id,
        role: state.user.role,
        cart:state.cart.cartGlobal
    }
}


export default connect(mapStateToProps,{resetUser})(HeaderKu) ;