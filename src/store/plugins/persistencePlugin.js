const retrieveCart = () => {
    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    catch (e) {
        console.error('Could not retrieve cart from storage', e);
    }

    return cart;
}

const storeCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export default function createPersistencePlugin() {
    return (store) => {
        store.subscribe((mutation, state) => {
            if (mutation.type === "GET_CART") {
                const cart = retrieveCart();
                store.commit("SET_CART", cart);
            } else if (mutation.type === "ADD_PRODUCT_TO_CART" || mutation.type === "UPDATE_PRODUCT_IN_CART" || mutation.type === "REMOVE_PRODUCT_FROM_CART") {
                storeCart(state.cart);
            }
        });
    }
}