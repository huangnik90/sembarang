import axios from 'axios'
import kue from 'universal-cookie'
import { urlApi } from '../support/urlApi';

const objCookie = new kue()

export const onLogin = (nama,pass)=>{
    
    return (dispatch) =>{
        //INI UNTUK NGUBAH LOADING JADI TRUE
        dispatch({
        type: "LOADING"
        
    })
        //GET DATA DARI FAKE API JSON SERVER
        axios.get("http://localhost:2000/user",{params:{username:nama,password:pass}})

        //KALO BERHASIL NGE GET MASUK KE .THEN
        .then((res)=> {
            console.log(res)
            //KALO USERNAME SAMA PASSWORD SESUAI RES.DATA.LENGTH BAKAL JADI 1
            if(res.data.length>0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload : {username: res.data[0].username, role: res.data[0].role,id:res.data[0].id}
                })
            }else{
                dispatch({
                    type:'USER_NOT_FOUND',  
                })
            }
        })
        //ERROR MESSAGE CAT ERROR
        .catch((err)=> {
            dispatch({
                type:'SISTEM_ERROR'
            })
        })
    
    }
    
}

export const keepLogin = (nama)=>{
    return (dispatch)=>{
        axios.get("http://localhost:2000/user",{params:{username:nama}})
        .then((res)=>{
            if (res.data.length>0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload : res.data[0]
                })
            }
        })
        .catch((err)=>console.log(err))
    }
}

export const resetUser = ()=>{
    return {
        type: 'RESET_USER'
    }
}

export const userRegister = (a,b,c,d)=>{
    return(dispatch) => {
        dispatch({
            type: "LOADING"
            
        })

        var newData ={username:a,password:b,email:c,phone:d}
        axios.get("http://localhost:2000/user?username="+newData.username)
        .then((res)=>{
            if (res.data.length>0){
                dispatch({
                    type:'USERNAME_NOT_AVAILABLE'
                })
            }
            else{
                axios.post("http://localhost:2000/user",newData) //masukin data ke database dummy
                .then((res)=>dispatch({
                    type:"LOGIN_SUCCESS",
                    payload:a
                },
                    objCookie.set('userData',a,{path:'/'})
                ))
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>dispatch({
            type:"SISTEM_ERROR"
        }))

    }
}

export const loginWithGoogle = (email)=>{
    return (dispatch)=>{
        axios.get(urlApi+"/user?username="+email)
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type:"LOGIN_SUCCESS",
                    payload:res.data[0]
                },
                objCookie.set('userData',email,{path:'/'})
                )
            }else{
                axios.post(urlApi+'/user',{username:email,role:"user"})
                .then((res) =>{
                    dispatch({
                        type:'LOGIN SUCCESS',
                        payload:res.data
                    },
                    objCookie.set('userData',email,{path:'/'})
                    )
                })
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>console.log(err))
    }
}