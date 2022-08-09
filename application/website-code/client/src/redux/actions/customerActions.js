export const setCart = (cart) => ({ //add cart item
    type: 'SET_CART',
    cart,
});

export const deleteCart = (cart) => ({ //delete cart item
    type: 'DELETE_CART',
    cart,
});

export const setEmail = (email) => ({ 
    type: 'SET_EMAIL',
    email,
});

export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_ISLOGGEDIN',
    isLoggedIn,
});

export const setPassword = (password) => ({ 
    type: 'SET_PASSWORD',
    password,
});

export const setId = (selectedID) => ({ 
    type: 'SET_ID',
    selectedID,
});



