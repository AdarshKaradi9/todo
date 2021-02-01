const initialState = {
    todos: null
};

const todoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'TODO_LOADED':
            return {
                ...state,
                todos: payload
            }
        case 'CLEAR_TODO':
            return {
                ...state,
                todos: null
            }
        default:
            return state;
    }
}

export default todoReducer;