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
  const [confirmRemoveCart, setConfirmRemoveCart] = useState(false)
  const [cartModal, setCartModal] = useState(false)
  const [sideBar, setSideBar] = useState(false)
  const [userSideBar, setUserSideBar] = useState(false)
  const [savedModal, setSavedModal] = useState(false)
  const [cartRemoveModal, setCartRemoveModal] = useState(false)
  const [savedRemoveModal, setSavedRemoveModal] = useState(false)
  const [quantityModal, setQuantityModal] = useState(false)

  const onClickSignOut = () => {
    setConfirmSignOut(!confirmSignOut)
  }

  const onClickMenu = () => {
    setSideBar(!sideBar)
  }

  const onClickUserAcctMenu = () => {
    setUserSideBar(!userSideBar)

  }

  const onClickDeleteAcct = () => {
    setConfirmDeleteAcct(!confirmDeleteAcct)
  }

  const onClickRemoveCart = () => {
    setConfirmRemoveCart(!confirmRemoveCart)
  }

  const ModalOn = () => {
    setCartModal(!cartModal)
  }

  const SavedModalOn = () => {
    setSavedModal(!savedModal)
  }

  const QuantityModalOn = () => {
    setQuantityModal(!quantityModal)
  }

  const ModalClose = () => {
    setCartRemoveModal(!cartRemoveModal)
  }

  const SavedModalClose = () => {
    setSavedRemoveModal(!savedRemoveModal)
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

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(allProduct);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
  }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase().split(' ');

    const filteredItems = allProduct.filter(item => {
      const searchableText = [
        item.Name,
        item.Brand,
        item.Category,
        item.Mini_Category,
        item.Sub_Category
      ].join(' ').toLowerCase();

      // Check if every part of the query matches any of the combined fields
      return value.every(part => searchableText.includes(part));
    }
    );

    window.location.href = `/allproducts/?q=${encodeURIComponent(value)}`;

    setResults(filteredItems);
    localStorage.setItem('SearchResult', JSON.stringify(filteredItems))
    localStorage.setItem('query', value.join(' '));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value.toLowerCase().split(' ');

      const filteredItems = allProduct.filter(item => {
        const searchableText = [
          item.Name,
          item.Brand,
          item.Category,
          item.Mini_Category,
          item.Sub_Category
        ].join(' ').toLowerCase();

        // Check if every part of the query matches any of the combined fields
        return value.every(part => searchableText.includes(part));
      }
      );

      window.location.href = `/allproducts/?q=${encodeURIComponent(value)}`;

      setResults(filteredItems);
      localStorage.setItem('SearchResult', JSON.stringify(filteredItems))
      localStorage.setItem('query', value.join(' '));
    }


  };

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

  const contextValue = {
    confirmSignOut,
    confirmDeleteAcct,
    confirmRemoveCart,
    handleSearch,
    handleChange,
    handleKeyDown,
    results,
    setResults,
    ModalOn,
    SavedModalOn,
    QuantityModalOn,
    cartModal,
    savedModal,
    ModalClose,
    SavedModalClose,
    cartRemoveModal,
    savedRemoveModal,
    quantityModal,
    setCartModal,
    setSavedModal,
    setCartRemoveModal,
    setSavedRemoveModal,
    setQuantityModal,
    setConfirmRemoveCart,
    query,
    sideBar,
    onClickSignOut,
    onClickDeleteAcct,
    onClickRemoveCart,
    onClickMenu,
    onClickUserAcctMenu,
    userSideBar,
    getTotalValue,
    getTotalCartItem,
    allProduct,
    cartItem,
    savedItem,
    setAllProduct,
    addToCart,
    removeFromCart,
    removeAllCart,
    saveItem,
    removeSaveItem,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider