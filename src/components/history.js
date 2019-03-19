import React from 'react'
import { urlApi } from '../support/urlApi';
import {connect } from 'react-redux'
import axios from 'axios'
import swal from '@sweetalert/with-react'

class History extends React.Component{
    state = {historyItem:[]}
    componentDidMount(){
        
        this.getDataApi()
    }
    getDataApi = ()=>{
        axios.get(urlApi +"/history?userId="+this.props.id )
        .then((res)=>{
            this.setState({historyItem:res.data})
        })
        .catch((err)=>console.log(err))
    }
    alertcuy = (val)=>{
        swal(
            <div>
                <img width="200px" height="270px" src={val.img} alt="Product"/>
                <h1>{val.nama}</h1>
                <h3>{val.desc}</h3> 
                <hr></hr>
                
                 Harga Asli :{val.harga} <br></br>
                 Diskon :{val.diskon} % <br></br>
                 Tanggal Pembelian :{val.tanggal} <br></br>
                 Jumlah Pembelian : {val.quantity}
               
                
                <hr></hr>
                THANK YOU FOR BUYING
                </div>
        )
    }

    renderJsx = ()=>{
        var jsx = this.state.historyItem.map((val,index)=>{
            return (
                
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{val.tanggal}</td>
                    <td>{val.nama}</td>
                    <td>{val.quantity}</td>
                    <td>Rp. {val.harga - (val.harga *(val.diskon/100))}</td>
                    <td><input className="btn border-secondary" type="button" onClick={()=>this.alertcuy(val)} value="Detail"></input></td>   

                </tr>

            )
        })
        return jsx
    }

    getTotalHarga = ()=>{
        var harga=0
        
         for (var i=0;i<this.state.historyItem.length;i++){
            harga += parseInt((this.state.historyItem[i].harga - (this.state.historyItem[i].harga *this.state.historyItem[i].diskon/100))*this.state.historyItem[i].quantity)
         }     
         return harga
   }
   getQuantity = ()=>{
    var q=0
    
     for (var i=0;i<this.state.historyItem.length;i++){
        q += this.state.historyItem[i].quantity
     }     
     return q
}

    render(){
        return (
            <div>
                            <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tanggal Pembelian</th>
                            <th scope="col">Nama Barang</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Harga satuan setelah Diskon</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.renderJsx()}
                        </tbody>
                      
                    </table>
                    <hr></hr>
                    <div>
                        
                            <p> Total Belanjaan {this.props.user} : Rp. {this.getTotalHarga()} </p> 
                            <p> Quantity Total Belanjaan : {this.getQuantity()} Piece(s) </p> 
                            <p> Varian Item : {this.state.historyItem.length} Macam </p>
                        
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        id : state.user.id,
        user :state.user.username
    }
}

export default connect(mapStateToProps)(History);