import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { urlApi} from '../support/urlApi'
import '../support/product.css'

class Product extends React.Component{
    state= {listProduct:[]}
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
                    <input type="button" className="d-block btn btn-primary" value="Add to Cart"/>
                </div>

            </div>
            
            )  
        })
        return jsx
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

export default Product;