import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios'
import { urlApi } from '../support/urlApi';
import {Button,Icon,Input} from 'semantic-ui-react'
import CurrencyFormat from 'react-currency-format';
import swal from 'sweetalert';
import {connect} from 'react-redux'
import PageNotFound from '../components/404'
import {cartLength} from '../1.actions/cartAction'



const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  
  
  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    harga:0,
    isEdit :false,
    quantity :0,editItem:{},editIndex : Number,
    totalHarga:0


  };
  
  componentDidMount(){
    this.getDataApi()
  }
  // componentDidUpdate(){
  //   this.getDataApi()
  // }
  getDataApi = ()=>{
      axios.get(urlApi+'/cart?userId='+this.props.id)
      .then((res)=>{
      console.log(res) 
      this.setState({rows:res.data})
      this.props.cartLength(this.state.rows.length)
    })
      .catch((err)=> console.log(err))
  }
  cekQuantity = ()=>{
    var jumlah = this.refs.quantity.value
    if (jumlah<1){
        this.refs.quantity.value=1
       swal("Warning","Tidak bole Minus","error")
    }
}
getQuantity = ()=>{
  var q=0
  
   for (var i=0;i<this.state.rows.length;i++){
      q += this.state.rows[i].quantity
   }     
   
   return q
}
 
  getTotalHarga = ()=>{
   var harga=0
   
    for (var i=0;i<this.state.rows.length;i++){
       harga += parseInt((this.state.rows[i].harga - (this.state.rows[i].harga *this.state.rows[i].diskon/100))*this.state.rows[i].quantity)
    }
  
    return harga
    
  }

  onBtnEdit = (val,index)=>{
    
    this.setState({isEdit:true,editItem:val,editIndex:index})
    
  }
  onBtnCancel = ()=>{
    this.setState({isEdit:false})
  }
  onBtnSave= ()=>{
    var all = this.state.editItem
    var quantity = parseInt(this.refs.quantity.value)
    var username = this.props.username
    var userId = this.props.id
    var productId = all.productId
    var nama = all.nama
    var harga = parseInt(all.harga)
    var diskon = parseInt(all.diskon)
    var category = all.category
    var img = all.img
    var desc = all.desc

    var newData = {
      quantity,username,userId,productId,nama,harga,diskon,category,img,desc 
    }
    axios.put(urlApi+"/cart/"+this.state.editItem.id,newData)
    .then((res)=>{
      console.log(res)

      swal("Success","Edit Success","success")
      this.getDataApi()
      this.setState({isEdit:false})
    })
    .catch((err)=>console.log(err))
  }



  onBtnDelete= (id)=>{
      axios.delete(urlApi+'/cart/'+id)
      .then((res)=>{
        this.getDataApi()
      })
      .catch((err)=>console.log(err))
  }

  cekOut = ()=>{
    
    axios.get(urlApi+'/cart?userId='+this.props.id)
    .then((res)=>{
      if (res.data.length>0){
        for (var i=0; i<this.state.rows.length;i++){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = dd + '/' + mm + '/' + yyyy;
          var quantity = res.data[i].quantity
          var username = res.data[i].username 
          var userId =res.data[i].userId 
          var productId = res.data[i].productId 
          var nama = res.data[i].nama 
          var harga = res.data[i].harga 
          var diskon = res.data[i].diskon 
          var category = res.data[i].category 
          var img = res.data[i].img 
          var desc = res.data[i].desc 
              // var cart = this.state.rows
          var newData = {
            tanggal:today,quantity,username,userId,productId,nama,harga,diskon,category,img,desc
            
          }

          axios.post(urlApi+"/history/",newData)
            .then((res)=>{
              swal("Thank you","Please Come Again","success")
            })
            .catch((err)=>console.log(err))

            axios.delete(urlApi+"/cart/"+this.state.rows[i].id)
            .then((res)=>{console.log(res)
              this.getDataApi()
              
            })
            .catch((err)=>console.log(err))


        }
   

            
            
      }else{
        swal("Item Kosong","Blank","error")
      }
    })
    .catch((err)=>console.log(err))
  }
  renderJsx = ()=>{
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
      
        return (
          
            <TableRow key={val.id}>
                  <TableCell align="center" component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="left">{val.nama}</TableCell>
                  
                  <TableCell align="left">{val.diskon} %</TableCell>
                  <TableCell align="left">
  <CurrencyFormat value={val.harga - (val.harga*(val.diskon/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                  
                  </TableCell>
                  {this.state.isEdit===true && this.state.editIndex===index?
                  <TableCell align="center">
                    <input type="number" min={1} ref="quantity" className="form-control" onChange={this.cekQuantity} defaultValue={val.quantity} style={{marginTop:"13px",width:"60px"}}></input>  
                 </TableCell>:
                  <TableCell align="center">{val.quantity}</TableCell>
                  
                }
                 
                  <TableCell align="left">{val.category}</TableCell>
                  <TableCell align="left"><img width="50px" height="50px" src={val.img}/></TableCell>
                  <TableCell align="left">
                  {this.state.isEdit===true && this.state.editIndex===index?
                  <div>
                    <Button animated color="blue" onClick={this.onBtnSave}>
                    <Button.Content visible>Save</Button.Content>
                    <Button.Content hidden>
                        <Icon name='save' />
                    </Button.Content>
                    </Button>

                
                    <Button animated color="red" onClick={()=>this.onBtnCancel()}>
                    <Button.Content visible>Cancel</Button.Content>
                    <Button.Content hidden>
                        <Icon name='cancel' />
                    </Button.Content>
                    </Button>
                    </div>:
                     <div>
                     <Button animated color="blue" onClick={()=>this.onBtnEdit(val,index)}>
                     <Button.Content visible>Edit</Button.Content>
                     <Button.Content hidden>
                         <Icon name='edit' />
                     </Button.Content>
                     </Button>
 
                 
                     <Button animated color="red" onClick={()=>this.onBtnDelete(val.id)}>
                     <Button.Content visible>Delete</Button.Content>
                     <Button.Content hidden>
                         <Icon name='delete' />
                     </Button.Content>
                     </Button>
                     </div>
                
                }
                  
                  
                  </TableCell>
            </TableRow>
            
        )
    })
     return jsx;
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  render() {
    if (this.props.role !=="admin" && this.props.role !=="user"){
      return <PageNotFound></PageNotFound>
    }else{
     
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
      
     return (
       
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Nama</TableCell>
                   
                    <TableCell align="center">Diskon</TableCell>
                    <TableCell align="center">Harga (Diskon)</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Kategori</TableCell>
                    <TableCell align="center">Gambar</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                
            </TableHead>
            <TableBody>

              {this.renderJsx()}
              
             <TableRow>
                <TableCell colSpan={7}>
                <p>Total Harga : <b>Rp. {this.getTotalHarga()}   </b> </p>

                </TableCell>
                <TableCell colSpan={6} >
                <Button animated color="green" onClick={this.cekOut}>
                              <Button.Content visible>Check Out</Button.Content>
                              <Button.Content hidden>
                                  <Icon name='cart' />
                              </Button.Content>
                              </Button>
                </TableCell>

             </TableRow>
             
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
               
              </TableRow>
            </TableFooter>
          </Table>
          <Paper>
              
          </Paper>

        
        </div>
        
        
      </Paper>
    );

    }
    
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
  return{
    role : state.user.role,
    id:state.user.id,
    username :state.user.username
  }
}

export default connect(mapStateToProps,{cartLength}) (withStyles(styles)(CustomPaginationActionsTable));