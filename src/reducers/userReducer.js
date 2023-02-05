export const userReducer = (state = null, action) => {
    const {type, payload} = action
    if(type === 'LOGGED_IN_USER' || type === 'LOGOUT') {
        return payload;
    }
    return state;
}