import { Divider, List, makeStyles } from '@material-ui/core'
import { CartListItem } from 'components/Products'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { getProductsInCart } from 'reducks/users/selectors'
import { PrimaryButton, TextDetail } from 'components/UIkit'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { orderProduct } from 'reducks/products/operation'

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
  },
}))

const OrderConfirm = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state: AppState) => state)
  const productsInCart = getProductsInCart(selector)

  const subTotal = useMemo(() => {
    return productsInCart.reduce((sum, productInCart) => (sum += productInCart.price), 0)
  }, [productsInCart])
  const shippingFee = subTotal >= 10000 ? 0 : 210
  const tax = (subTotal + shippingFee) * 0.1
  const total = subTotal + shippingFee + tax

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((productInCart) => (
                <CartListItem key={productInCart.cartId} product={productInCart} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={'商品合計'} value={`¥${subTotal.toLocaleString()}`} />
          <TextDetail label={'送料'} value={`¥${shippingFee.toLocaleString()}`} />
          <TextDetail label={'消費税'} value={`¥${tax.toLocaleString()}`} />
          <Divider />
          <TextDetail label={'合計（税込）'} value={`¥${total.toLocaleString()}`} />
          <PrimaryButton label={'注文する'} onClick={order} />
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm
