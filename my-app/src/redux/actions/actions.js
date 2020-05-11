

export const LoginFetch = (email) => {
    return (
        {
            type: 'LOGIN',
            userEmail:email
        }
    )
};
export const SignOut = () => {
    return (
        {
            type: 'SIGN_OUT',
        }
    )
};



export const FetchProduct = (product) => {

    return (
        {
            type: 'FETCH_PRODUCT',
            product:product
        }
    )
};
export const ProductEditId = (productId) => {
    return (
        {
            type: 'PRODUCT_EDIT_ID',
            productId:productId
        }
    )
};
