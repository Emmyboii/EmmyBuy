import React, { useState, useEffect, createContext } from 'react'

export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart = {}
  for (let i = 0; i < 1200 + 1; i++) {
    cart[i] = 0
  }
  return cart
}

const getDefaultSavedItem = () => {
  let savedItem = {}
  for (let i = 0; i < 1200 + 1; i++) {
    savedItem[i] = 0
  }
  return savedItem
}

const ShopContextProvider = (props) => {

  const [allProduct, setAllProduct] = useState([])
  const [confirmSignOut, setConfirmSignOut] = useState(false)
  const [confirmDeleteAcct, setConfirmDeleteAcct] = useState(false)

  const onClickSignOut = () => {
    setConfirmSignOut(!confirmSignOut)
  }

  const onClickDeleteAcct = () => {
    setConfirmDeleteAcct(!confirmDeleteAcct)
  }

  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem('cartItem');
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  })

  const [savedItem, setSavedItem] = useState(() => {
    const savedItems = localStorage.getItem('savedItem');
    return savedItems ? JSON.parse(savedItems) : getDefaultSavedItem();
  })

  const [loggedOutCartItem, setLoggedOutCartItem] = useState(() => {
    const savedCart = localStorage.getItem('loggedOutCartItem');
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  })

  const [loggedOutSavedItem, setLoggedOutSavedItem] = useState(() => {
    const savedItems = localStorage.getItem('loggedOutSavedItem');
    return savedItems ? JSON.parse(savedItems) : getDefaultSavedItem();
  })

  useEffect(() => {
    fetch('http://localhost:5000/product/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProduct(data))

    if (localStorage.getItem('token')) {
      fetch('http://localhost:5000/user/getCart', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((data) => setCartItem(data))
    }

  }, [])


  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    if (localStorage.getItem('token')) {
      fetch('http://localhost:5000/user/addToCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemId": itemId }),
      }).then((res) => res.json())
    } else {
      setLoggedOutCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (localStorage.getItem('token')) {
      fetch('http://localhost:5000/user/removeFromCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemId": itemId }),
      }).then((res) => res.json())
    } else {
      setLoggedOutCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }
  }

  const removeAllCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: 0 }))
    if (localStorage.getItem('token')) {
      fetch('http://localhost:5000/user/removeAllCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemId": itemId }),
      }).then((res) => res.json())
    } else {
      setLoggedOutCartItem((prev) => ({ ...prev, [itemId]: 0 }))
    }
  }

  const saveItem = (itemId) => {
    setSavedItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    if (localStorage.getItem('token')) {
      fetch('http://localhost:5000/user/addSavedItem', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemId": itemId }),
      }).then((res) => res.json())
    } else {
      setLoggedOutSavedItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }
  const removeSaveItem = (itemId) => {
    setSavedItem((prev) => ({ ...prev, [itemId]: 0 }))
    if (localStorage.getItem('token')) {
      fetch('http://localhost:5000/user/removeSavedItem', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemId": itemId }),
      }).then((res) => res.json())
    } else {
      setLoggedOutSavedItem((prev) => ({ ...prev, [itemId]: 0 }))
    }
  }

  const getTotalValue = () => {
    let totalValue = 0
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = allProduct.find((product) => product.id === Number(item))
        totalValue += itemInfo.New_price * cartItem[item]
      }
    }
    return totalValue
  }

  const getTotalCartItem = () => {
    let totalCart = 0
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalCart += cartItem[item]
      }
    }
    return totalCart
  }

  useEffect(() => {
    // Save cart to local storage on cart updates
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    // Save item to local storage on item updates
    localStorage.setItem('savedItem', JSON.stringify(savedItem));
  }, [savedItem]);

  useEffect(() => {
    // Save cart to local storage on cart updates
    localStorage.setItem('loggedOutCartItem', JSON.stringify(loggedOutCartItem));
  }, [loggedOutCartItem]);

  useEffect(() => {
    // Save item to local storage on item updates
    localStorage.setItem('loggedOutSavedItem', JSON.stringify(loggedOutSavedItem));
  }, [loggedOutSavedItem]);

  const contextValue = { confirmSignOut, confirmDeleteAcct, onClickSignOut, onClickDeleteAcct, getTotalValue, getTotalCartItem, allProduct, cartItem, savedItem, setAllProduct, addToCart, removeFromCart, removeAllCart, saveItem, removeSaveItem, }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider