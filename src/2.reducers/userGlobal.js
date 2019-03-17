const INITIAL_STATE = {
    id: 0,
    username: '',
    error:'',
    loading:false,
    role:''
}

export default (state = INITIAL_STATE, action) => {
    // if(action.type === 'LOGIN_SUCCESS'){
    //     return {...INITIAL_STATE,username:action.payload.username, role:action.payload.role}
    // }else if(action.type==="LOADING"){
    //     return {...INITIAL_STATE,loading:true}
    // }else if(action.type==='USER_NOT_FOUND'){
    //     return {...INITIAL_STATE,error:"Try again"}
    // }else if(action.type==='SISTEM_ERROR'){
    //     return {...INITIAL_STATE,error:"Sistem Error"}
    // }else if(action.type==='RESET_USER'){
    //     return INITIAL_STATE
    // }else if(action.type === "USERNAME_NOT_AVAILABLE"){
    //     return {...INITIAL_STATE,error:"Username uda ada"}
    // }
    // else{
    //     return state
    // }
  
    switch(action.type){
        case "LOGIN_SUCCESS":
            return  {...INITIAL_STATE,username:action.payload.username, 
                role:action.payload.role,
                id:action.payload.id}
        case "LOADING":
            return {...INITIAL_STATE,loading:true}
        case "USER_NOT_FOUND":
            return {...INITIAL_STATE,error:"Try again"}
        case "SISTEM_ERROR":
            return {...INITIAL_STATE,error:"Sistem Error"}
        case "RESET_USER":
            return INITIAL_STATE
        case "USERNAME_NOT_AVAILABLE":
            return {...INITIAL_STATE,error:"Username uda ada"}
        case "CART_ADD":
            return {...INITIAL_STATE,cart:action.payload}
        default:
            return state
    
    }

}