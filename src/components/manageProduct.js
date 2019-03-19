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
    isEdit:false,
    editItem:{}
  };
  componentDidMount(){
    this.getDataApi()
  }
  getDataApi = ()=>{
      axios.get(urlApi+'/product')
      .then((res)=> this.setState({rows:res.data}))
      .catch((err)=> console.log(err))
  }
  onBtnDelete= (id)=>{
      axios.delete(urlApi+'/product/'+id)
      .then((res)=>{
        this.getDataApi()
      })
      .catch((err)=>console.log(err))
  }
  renderJsx = ()=>{
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val)=>{
        return (
          
            <TableRow key={val.id}>
                  <TableCell component="th" scope="row">
                    {val.id}
                  </TableCell>
                  <TableCell align="left">{val.nama}</TableCell>
                  <TableCell align="left">
  <CurrencyFormat value={val.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                  
                  </TableCell>
                  <TableCell align="left">{val.diskon} %</TableCell>
                  <TableCell align="left">{val.desc}</TableCell>
                  <TableCell align="left">{val.category}</TableCell>
                  <TableCell align="left"><img width="50px" height="50px" src={val.img}/></TableCell>
                  <TableCell align="left">
                    <Button onClick={()=>this.btnEditClick (val)} animated color="green">
                    <Button.Content visible >Edit</Button.Content>
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
                  
                  </TableCell>
            </TableRow>
        )
    })
     return jsx;
  }

  onBtnAdd= ()=>{
     var nama = this.nama.inputRef.value
     var harga = parseInt(this.harga.inputRef.value)
     var diskon = parseInt(this.diskon.inputRef.value)
     var kategori = this.kategori.inputRef.value
     var deskripsi = this.deskripsi.inputRef.value
     var gambar = this.gambar.inputRef.value
     
     var newData ={nama:nama, harga:harga,diskon:diskon,desc:deskripsi,category:kategori,img:gambar}

     axios.post(urlApi+"/product",newData)
     .then((res)=>{
        swal("ADD PRODUCT", "Sukses nambah data!!", "success");
        this.getDataApi()
        this.nama.inputRef.value=""
        this.harga.inputRef.value=""
        this.diskon.inputRef.value=""
        this.kategori.inputRef.value=""
        this.deskripsi.inputRef.value=""
        this.gambar.inputRef.value=""
     })
     .catch((err)=>console.log(err))
  }
  btnEditClick = (parameter)=>{
    this.setState({isEdit:true,editItem:parameter})

  }

  onBtnCancel= ()=>{
    this.setState({isEdit:false})
  }
  onBtnEditSave = ()=>{
    var nama = this.namaEdit.inputRef.value ===""?this.state.editItem.nama :this.namaEdit.inputRef.value
    var harga = this.hargaEdit.inputRef.value ===""?this.state.editItem.harga :this.hargaEdit.inputRef.value
    var diskon = this.diskonEdit.inputRef.value ===""?this.state.editItem.diskon :this.diskonEdit.inputRef.value
    var kategori = this.kategoriEdit.inputRef.value===""?this.state.editItem.category :this.kategoriEdit.inputRef.value
    var deskripsi = this.deskripsiEdit.inputRef.value===""?this.state.editItem.desc :this.deskripsiEdit.inputRef.value
    var gambar = this.gambarEdit.inputRef.value===""?this.state.editItem.img :this.gambarEdit.inputRef.value
    var newEditData = {
      nama,
      harga,
      desc:deskripsi,
      diskon,
      category:kategori,
      img:gambar
    }
    axios.put(urlApi+'/product/'+this.state.editItem.id,newEditData)
    .then((res)=>{
      swal("EDIT PRODUCT", "Sukses Edit data!", "success");
      this.getDataApi()
      this.setState({isEdit:false})
      
    })
    .catch((err)=>console.log(err))


  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  render() {
    if (this.props.role !=="admin"){
      return <PageNotFound></PageNotFound>
    }else{

    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    var {id,nama,harga,diskon,desc,category,img} =this.state.editItem
     return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Nama</TableCell>
                    <TableCell align="center">Harga</TableCell>
                    <TableCell align="center">Diskon</TableCell>
                    <TableCell align="center">Deskripsi</TableCell>
                    <TableCell align="center">Kategori</TableCell>
                    <TableCell align="center">Gambar</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
               
            </TableHead>
            <TableBody>

              {this.renderJsx()}
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
              <Table>
                  <TableHead>
                    <TableRow>
                            <TableCell>ADD PRODUCT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                        <TableCell>
                            <Input ref={input=> this.nama = input} placeholder="NamaProduct"></Input>
                            <Input ref={input=> this.harga = input} className="mt-2 ml-2 mb-2" icon='dollar sign' iconPosition='left' placeholder='Masukan Harga' />
                            <Input ref={input=> this.diskon = input}className="mt-2 ml-2 mb-2"  iconPosition='left' placeholder='Masukan Diskon' />
                            <Input ref={input=> this.kategori = input} className="mt-2 ml-2 mb-2"  iconPosition='left' placeholder='Masukan Kategori' />
                            <select ref ="dropdown"name="tableMenu" id="tableMenu" class="dropdown-menu">
                                      <option value="Att1">Att1</option>
                                      <option value="Att2">Att2</option>
                                      <option value="Att3">Att3</option>
                            </select>
                            <Input ref={input=> this.deskripsi = input}className="mt-2 ml-2 mb-2"  iconPosition='left' placeholder='Masukan Deskripsi' />
                            <Input ref={input=> this.gambar = input}className="mt-2 ml-2 mb-2"  iconPosition='left' placeholder='Masukan link gambar' />
                            <Button animated color="blue" className="mt-2 ml-2 mb-2" onClick={this.onBtnAdd}>
                            <Button.Content visible>Add Product</Button.Content>
                            <Button.Content hidden>
                                <Icon name='add' />
                            </Button.Content>
                            </Button>
                        </TableCell>
                    </TableRow>

                  </TableBody>
              </Table>
          </Paper>

          {
          
            this.state.isEdit === true? <Paper>
              <Table>
                  <TableHead>
                    <TableRow>
                            <TableCell>{id}: EDIT PRODUCT -  {nama}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                        <TableCell>
                            <Input ref={input=> this.namaEdit = input} placeholder={nama}></Input>
                            <Input ref={input=> this.hargaEdit = input} placeholder={harga}  className="mt-2 ml-2 mb-2" icon='dollar sign' iconPosition='left'  />
                            <Input ref={input=> this.diskonEdit = input} placeholder={diskon} className="mt-2 ml-2 mb-2"  iconPosition='left'  />
                            <Input ref={input=> this.kategoriEdit = input} placeholder={category} className="mt-2 ml-2 mb-2"  iconPosition='left'  />
                            <Input ref={input=> this.deskripsiEdit = input} placeholder={desc}  className="mt-2 ml-2 mb-2"  iconPosition='left' />
                            <Input ref={input=> this.gambarEdit = input} placeholder={img}  className="mt-2 ml-2 mb-2"  iconPosition='left' />
                            <Button animated color="blue" className="mt-2 ml-2 mb-2" onClick={() =>this.onBtnEditSave()}>
                            <Button.Content visible>Save</Button.Content>
                            <Button.Content hidden>
                                <Icon name='save' />
                            </Button.Content>
                            </Button>
                            <Button animated color="red" className="mt-2 ml-2 mb-2" onClick={this.onBtnCancel}>
                            <Button.Content visible>Cancel</Button.Content>
                            <Button.Content hidden>
                                <Icon name='cancel' />
                            </Button.Content>
                            </Button>
                        </TableCell>
                    </TableRow>

                  </TableBody>
              </Table>
          </Paper>:null
        }

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
    role : state.user.role
  }
}

export default connect(mapStateToProps) (withStyles(styles)(CustomPaginationActionsTable));