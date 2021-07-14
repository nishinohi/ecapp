import { List, makeStyles } from '@material-ui/core'
import { CartListItem } from 'components/Products'
import { PrimaryButton } from 'components/UIkit'
import GreyButton from 'components/UIkit/GreyButton'
import { push } from 'connected-react-router'
import React from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { getProductsInCart } from 'reducks/users/selectors'

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%',
  },
})

const CartList = (): JSX.Element => {
  const classes = useStyles()
  const selector = useSelector((state: AppState) => state)
  const productInCart = getProductsInCart(selector)
  const dispatch = useDispatch()

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, [])

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, [])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productInCart.length > 0 &&
          productInCart.map((productInCart, index) => <CartListItem product={productInCart} key={index} />)}
      </List>
      <div className="module-spacer--small" />
      <div className="p-grid__column">
        <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
        <div className="module-spacer--extra-small" />
        <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
      </div>
    </section>
  )
}

export default CartList
