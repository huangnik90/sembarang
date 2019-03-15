import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {userRegister} from '../1.actions/userAction'
import {loginWithGoogle} from '../1.actions/userAction'
import Loader from 'react-loader-spinner'
import {provider,auth} from '../support/google'


class Register extends React.Component{

    state = {error:''}
    componentWillReceiveProps  =(newProps)=>{
        if (newProps.error!== ""){
            this.setState({error:newProps.error})
        }
    }
    loginWithGoogle = ()=>{
        auth().signInWithPopup(provider)
        .then((res)=>{
            console.log(res)
            this.props.loginWithGoogle(res.user.email)
        })
        .catch((err)=>console.log(err))
    }
    registerUser = ()=>{
        var username = this.refs.username.value 
        var password = this.refs.password.value 
        var email = this.refs.email.value 
        var phone = this.refs.phone.value 

        if(username === ""|| password ===""||email ===""||phone===""){
            this.setState({error: "Mesti isi"})
        }else{
            this.props.userRegister(username,password,email,phone)
            this.setState({error: "Register Berhasil"})
        }
    }
    renderLoaderOrBtn = ()=>{
        if(this.props.loading === true){
            return <Loader
            type="ThreeDots"
            color="#FF0000"
            height="30"
            width="30"
            ></Loader>
         }else{
             return <button onClick={this.registerUser} type="button"  className="btn btn-primary" style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Sign Up!</button>
         }

    }
    renderErrorMessage = ()=>{
        if (this.state.error!==""){
            return <div className="alert alert-danger mt-3" role="alert"> {this.state.error}</div>
        }

    }
    render(){
        if(this.props.user !== ""){
            return <Redirect to='/' />
        }
        return(
            <div className="container myBody " style={{minHeight:"600px"}}>
                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                        
                        <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                            <fieldset>
                                
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Username</label>
                                    <div className="col-sm-9">
                                    <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Password</label>
                                    <div className="col-sm-9">
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Phone</label>
                                    <div className="col-sm-9">
                                    <input type="phone" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 0857xxxxxxxx" required />
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    
                                <div className="col-12" style={{textAlign:'center'}}>
                                {this.renderLoaderOrBtn()}
                                <div>
                                <button onClick={this.loginWithGoogle} style={{width:"300px",marginTop:"10px"}} className="btn border-primary"><i class="fab fa-google"></i></button>
                                </div>
                      
                                {this.renderErrorMessage()}
                                </div>

                                </div>
                                <div className="btn my-auto"><p>Already have Account? <Link to="/login" className="border-bottom">Login</Link></p></div>
                                
                            </fieldset>
                        </form>
                        
                    </div>                
                </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        user :state.user.username,
        loading : state.user.loading,
        error : state.user.error
    }
}
export default connect(mapStateToProps,{userRegister,loginWithGoogle})(Register) ;