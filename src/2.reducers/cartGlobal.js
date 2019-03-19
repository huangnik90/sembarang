const INITIAL_STATE = {
    cartGlobal : 0
}

export default (state = INITIAL_STATE,action) =>{
    if (action.type === "JUMLAH_DATA") {
        return {...INITIAL_STATE, cartGlobal: action.payload}
    } else {
        return state
    }
}