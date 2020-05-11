const initialState = {
    userEmail:null,
    unification:false,
};
const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userEmail: action.userEmail,
                unification:true

            }
        case 'SIGN_OUT':
            return {
                ...state,
                userEmail: null,
                unification:false
            }
    }
    return state
};


export default reducerUser;
