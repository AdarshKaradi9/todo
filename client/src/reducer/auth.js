
const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null
};

// a simple reducer that takes in initial state and action as a parameter
const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case 'REGISTER_SUCCESS': 
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        
        default:
            return state;
}
}

export default authReducer;