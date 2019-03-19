import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { urlApi} from '../support/urlApi'
import '../support/product.css'
import {connect} from 'react-redux'
import swal from 'sweetalert'

class Product extends React.Component{
    state= {listProduct:[],newCart:[]}
    //PASTI DI PAKE UNTUK SHOW PRODUCT ATAU MENAMPILKAN DATA
    //SETEKAG REBDER BARU DI PANNGGIL
    componentDidMount(){
        this.getProduct()
    }
    getProduct = ()=>{
        axios.get(urlApi +'/product')
        .then((res) => this.setState({listProduct:res.data}))
        .catch((err)=>console.log(err))
    }
    // addCart = (val)=>{
    //     axios.get(urlApi+"/cart?id="+this.props.id)
    //     .then((res)=>{
    //         var custom = res.data[0]
    //         var username = custom.username
    //         var password = custom.password
    //         var email = custom.email
    //         var phone = custom.phone
    //         var role = custom.role
    //         this.setState({newCart:[...this.state.newCart,val]})
    //         var cart = this.state.newCart
           
    //         var newData = {
    //             username,
    //             password,
    //             email,
    //             phone,
    //             role,
    //             cart
    //         }
           

    //         axios.put(urlApi+"/user/"+this.props.id,newData)
    //         .then((res)=>{
    //             console.log(res)
    //             swal ("DATA ADD TO CART","PLEASE PURCHASE","success")
    //         })
    //         .catch((err)=>console.log(err))

    //     })
    //     .catch((err)=>console.log(err))
        
    // }

    // addCart = (val)=>{
    //     axios.get(urlApi+"/product?id="+val.id)
    //     .then((res)=>{
    //         console.log(res)
    //         var custom = res.data[0]
    //         var productid = custom.id
    //         var nama = custom.nama
    //         var harga = custom.harga
    //         var desc = custom.desc
    //         var diskon = custom.diskon
    //         var category = custom.category
    //         var img = custom.img
    //         var userid = this.props.id
    //         var username = this.props.username   
            
    //         var newData = {
    //             productid,nama,harga,desc,diskon,category,img,userid,username
    //         }
    //         axios.get(urlApi+"/cart?userid="+this.props.id+"&productid="+productid)
    //         .then((res)=>{
    //             if (res.data.length>0){
    //                 var custom = res.data[0]
    //                 var productid = custom.id
    //                 var nama = custom.nama
    //                 var harga = custom.harga
    //                 var desc = custom.desc
    //                 var diskon = custom.diskon
    //                 var category = custom.category
    //                 var img = custom.img
    //                 var userid = this.props.id
    //                 var username = this.props.username   
    //                 var quantity = custom.quantity+1
    //                 var editData = {
    //                     productid,nama,harga,desc,diskon,category,img,userid,username,quantity
    //                 }
    //                 axios.put(urlApi+"/cart/"+res.data[0].id,editData)
    //                 .then((res)=>{
    //                     console.log(res)
    //                     swal("OK","OK","success")
    //                 })
    //                 .catch((err)=>console.log(err))
    //             }else{
    //                 axios.post(urlApi+"/cart",{...newData,quantity:1})
    //                 .then((res)=>{
    //                     console.log(res)
    //                     swal ("DATA ADD TO CART","PLEASE PURCHASE","success")
    //                 })
    //                 .catch((err)=>console.log(err))
    //             }
    //         })
    //         .catch((err)=>console.log(err))
          
         
    //     })
    //     .catch((err)=>console.log(err))
    // }

    addCart = (data) => {    
        axios.get(urlApi+'/product?id='+ data.id)
         .then((res) => {
             var username = this.props.username
             var userId = this.props.id
             var productId = res.data[0].id
             var nama = res.data[0].nama
             var harga = res.data[0].harga
             var desc = res.data[0].desc
             var diskon = res.data[0].diskon
             var category = res.data[0].category
             var img = res.data[0].img
             var newData = {
                 username, userId, productId, nama,
                 harga, diskon, category, img,desc
             }
             axios.get(urlApi+'/cart?userId='+this.props.id+'&productId='+newData.productId)
                 .then((res) => {
                     if(res.data.length > 0){
                         var quantity = res.data[0].quantity+1
                         axios.put(urlApi+'/cart/'+res.data[0].id,{...newData, quantity})
                             .then((res) =>{
                                 console.log(res)
                                 swal('Success', 'Item added to Cart', 'success')
                             })
                             .catch((err) => {
                                 console.log(err)
                             }) 
                     } else {
                         axios.post(urlApi+'/cart', {...newData, quantity : 1})
                             .then((res) =>{
                                 console.log(res)
                                 swal('Success', 'Item added to Cart', 'success')
                             })
                             .catch((err) => {
                                 console.log(err)
                             })
                     }
                 })
         })
         .catch((err) => console.log(err))
 }
    
    renderProductJsx = ()=>{
        var jsx = this.state.listProduct.map((val)=>{
            // if (val.diskon===0){
            //     return(
            //         <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
            //         <img src={val.img}className="card-img-top gambar" width="200px" height="200px;" alt="..." />
                    
            //         <div className="card-body">
            //         <div className="kategori">
            //               <p>{val.category}</p>
            //         </div>
            //             <p className="card-text">{val.desc}</p>
            //             <p className="card-text" style={{marginLeft:"5px",color:"black",fontWeight:"500"}}>Rp. {val.harga - (val.harga*val.diskon/100)}</p>
            //             <input type="button" className="btn btn-primary" value="Add to Cart"/>
            //         </div>
    
            //     </div>
            //     )
            // }
            return(
                
            <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                <Link to={'/productdetail/'+val.id}>
                <img src={val.img}className="card-img-top gambar" width="200px" height="200px;" alt="..." />
                </Link>
                {val.diskon>0 ? 
                        <div className="diskon">
                    {val.diskon} %
                        </div>:null
                }
                <div className="card-body">
                <div className="kategori">
                <p >{val.category}</p>
                </div>
                    <p className="card-text">{val.desc}</p>
                {   val.diskon>0?
                    <p className="card-text" style={{display:"inline",textDecoration:"line-through",color:"red"}}>Rp. {val.harga}</p>:null
                }
                    <p className="card-text" style={{marginLeft:"5px",display:"inline",color:"black",fontWeight:"500"}}>Rp. {val.harga - (val.harga*val.diskon/100)}</p>
                    {this.props.username!==""?
                    <input type="button" className="d-block btn btn-primary" onClick={() =>this.addCart(val)}value="Add to Cart"/>
                    : 
                    <Link to="/login"><input type="button" className="d-block btn btn-primary" value="Add to Cart"/></Link>
                    }
                </div>

            </div>
            
            )  
        })
        return jsx
    }
    alert=()=>{
        alert("oi")
    }
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                {this.renderProductJsx()}
                </div>
             
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        username : state.user.username,
        id:state.user.id
    }
   
}
export default connect (mapStateToProps)(Product);