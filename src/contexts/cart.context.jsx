import {createContext, useEffect, useState} from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  )
  if(existingCartItem){
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    )
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const reduceCartItem = (cartItems, productToReduce) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToReduce.id
  )
  if(existingCartItem.quantity === 1){
    return cartItems.filter(item => item.id!== productToReduce.id)
  }
  return cartItems.map(cartItem =>
    cartItem.id === productToReduce.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(item => item.id!== cartItemToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: ()=>{},
  cartItems: [],
  addItemToCart: ()=>{},
  reduceItemFromCart: ()=>{},
  clearItemFromCart: ()=>{},
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({children})=>{
  const [isCartOpen, setIsCartOpen]=useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(()=>{
    const count = cartItems.reduce((sum, cartItem)=>sum + cartItem.quantity, 0)
    setCartCount(count)
  }, [cartItems])

  useEffect(()=>{
    const total = cartItems.reduce((sum, cartItem)=>sum + cartItem.quantity * cartItem.price, 0)
    setCartTotal(total)
  }, [cartItems])

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }

  const reduceItemFromCart = (product) => {
    setCartItems(reduceCartItem(cartItems, product))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, reduceItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal}

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}