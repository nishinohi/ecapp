import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Badge, unstable_createMuiStrictModeTheme } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import { getProductsInCart, getUserId } from 'reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { AddedProduct } from 'reducks/users/types'
import { fetchProductsInCart } from 'reducks/users/operations'

const HeaderMenus = (props: any): JSX.Element => {
  const selector = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  let productsInCart = getProductsInCart(selector)
  const uid = getUserId(selector)

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('cart')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const product = change.doc.data() as AddedProduct
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInCart.push(product)
              break
            case 'modified': {
              const index = productsInCart.findIndex((productInCart) => productInCart.cartId === change.doc.id)
              productsInCart[index] = product
              break
            }
            case 'removed':
              productsInCart = productsInCart.filter((productInCart) => productInCart.cartId !== change.doc.id)
              break
            default:
          }
        })
        dispatch(fetchProductsInCart(productsInCart))
      })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus
