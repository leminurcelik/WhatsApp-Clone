export const initialState = {
    user: null,
};
//Push information to data layer
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            //Keep the satate of layer and change user to be whatever dispatch
            return{
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;