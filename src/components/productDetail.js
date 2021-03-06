import React from 'react'
import Axios from 'axios'
import { urlApi } from '../support/urlApi';
import { connect} from 'react-redux'
import swal from'sweetalert'

class ProductDetail extends React.Component{
    state = {product:{},quantity:""}
    componentDidMount=()=>{
        this.getDataApi()
    }
    cekQuantity = ()=>{
        var jumlah = this.refs.quantity.value
        if (jumlah<1){
            this.refs.quantity.value=1
            this.setState({quantity:"wrong input"})
        }else{
            this.setState({quantity:""})
        }
       
    
    }
    getDataApi = ()=>{
        var urlID = this.props.match.params.terserah //INI BUAT AMBIL ID DI LINK setting PATH DI APP.js JGN LUPA
        Axios.get(urlApi+'/product/'+urlID)
        .then((res)=>{
            this.setState({product:res.data})
        })
        .catch((err)=>console.log(err))
    }
    

    addCart = (data) => {    
        Axios.get(urlApi+'/product?id='+ data.id)
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
             var quantity=parseInt(this.refs.quantity.value)
             var newData = {
                 username, userId, productId, nama,
                 harga, diskon, category, img,desc,quantity
             }
             Axios.get(urlApi+'/cart?userId='+this.props.id+'&productId='+newData.productId)
                 .then((res) => {
                     if(res.data.length > 0){
                         var quantity = res.data[0].quantity+parseInt(this.refs.quantity.value)
                         Axios.put(urlApi+'/cart/'+res.data[0].id,{...newData, quantity})
                             .then((res) =>{
                                 console.log(res)
                                 swal('Success', 'Item added to Cart', 'success')
                             })
                             .catch((err) => {
                                 console.log(err)
                             }) 
                     } else {
                         Axios.post(urlApi+'/cart', {...newData})
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


    render()
    {
        var {nama,harga,diskon,desc,img} = this.state.product
        return(
            <div className="container">
                <div className="row">
                    <div className="col-4 col-md-4">

                    <div className="card" style={{width: '100%'}}>
                        <img src={img} className="card-img-top" alt="ini gambar" />
                        <div className="card-body">
                       
                        </div>
                    </div>


                    </div>
                    <div className="col-8 col-md-8">
                        <h1> {nama} </h1>
                        <hr></hr>
                        <div style={{display:"inline-block",textAlign:"center",color:"#FAFAFA",backgroundColor:"#D50000",width:"50px",height:"22px",marginRight:"10px"}}>
                                {diskon}%
                        </div>
                        <span style={{fontSize:"14px",fontWeight:"600px",color:"#606060",textDecoration:"line-through"}}>Rp. {harga}</span>
                        <div style={{fontSize:"24px",fontWeight:"700",color:"#ff5722"}}>
                        Rp. {harga - (harga*diskon/100)}
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-2">
                                <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                Jumlah
                                </div>
                                <input type="number" ref="quantity" min={1} className="form-control" onChange={this.cekQuantity} defaultValue="1" style={{marginTop:"13px",width:"60px"}}></input>
                                <div style={{color:"red"}}> {this.state.quantity}</div>

                            </div>
                            <div className="col-md-8 col-8">
                                <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                <i class="far fa-comments"></i> Catatan Untuk Penjual (Optional)
                                </div>
                                <input type="text" placeholder="CONTOH: WARNA, UKURAN ATAU DESIGN" className="form-control" style={{marginTop:"13px"}}></input>
                            </div>

                        </div>
                        <hr></hr>
                        <div className="row mt-4">
                            <div className="col-md-8 col-8">
                            
                            <p style={{color:"#606060", fontStyle:"italic"}}> 
                            {desc}
                            </p>
                            </div>
                            
                            {this.props.user!==""?
                            <div className="col-md-8 col-8">
                            <input className="btn border-secondary col-md-4" value="Add To Wishlist"></input>
                            <input className="btn border-primary col-md-4" value="Beli Sekarang"></input>
                            <input className="btn border-success col-md-4" onClick={()=>this.addCart(this.state.product)} value="Masukan Keranjang"></input>
                            </div>
                            :
                            <div className="col-md-8 col-8">
                            <input className="btn border-secondary col-md-4" disabled value="Add To Wishlist"></input>
                            <input className="btn border-primary col-md-4" disabled value="Beli Sekarang"></input>
                            <input className="btn border-success col-md-4" disabled value="Masukan Keranjang"></input>
                            </div>
                            }
                           
                           

                            
                            
                            
                            
                            
                            
                        </div>
                       
                       
                    </div>
                </div>
            </div>
        )
    }
}


const mapStatetoProps =(state)=>{
    return {
        id:state.user.id,
        user :state.user.username,
        role :state.user.role
    }
}
export default connect(mapStatetoProps) (ProductDetail);