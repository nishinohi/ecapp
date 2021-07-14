import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import { db } from '../../firebase'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { AddedProduct } from 'reducks/users/types'
import { getUserId } from 'reducks/users/selectors'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
})

type CartListItemProps = {
  product: AddedProduct
}

const CartListItem = (props: CartListItemProps): JSX.Element => {
  const classes = useStyles()
  const selector = useSelector((state: AppState) => state)
  const uid = getUserId(selector)

  const image = props.product.images[0].path
  const name = props.product.name
  const size = props.product.size
  const price = props.product.price.toLocaleString()

  const removeProductFromCart = (id: string) => {
    return db.collection('users').doc(uid).collection('cart').doc(id).delete()
  }

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image}></img>
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={`サイズ：${size}`} />
          <ListItemText primary={`¥${price}`} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default CartListItem
