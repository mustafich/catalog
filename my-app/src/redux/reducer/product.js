const initialState = {
   product:[],
    productEdit:null
};
const reducerProduct = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_PRODUCT':

            return {
                ...state,
                product: action.product

            }
        case 'PRODUCT_EDIT_ID':
            let productEditId = state.product.filter((e)=>{
                return action.productId===e.productId
            })
            return {
                ...state,
                productEdit: productEditId[0]

            }
    }
    return state
};


export default reducerProduct
