import { Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import { PrimaryButton } from 'components/UIkit'
import { push } from 'connected-react-router'
import React from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { OrderedProduct } from 'reducks/products/types'

type OrderedProductsProps = {
  products: OrderedProduct[]
}

const useStyles = makeStyles({
  list: {
    background: '#fff',
    height: 'auto',
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
})

const OrderedProducts = (props: OrderedProductsProps): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const products = props.products

  const goToProductDetail = useCallback((id: string) => {
    dispatch(push(`/product/detail/${id}`))
  }, [])

  return (
    <List>
      {products.map((product, index) => (
        <>
          <ListItem className={classes.list} key={index.toString()}>
            <ListItemAvatar>
              <img className={classes.image} src={product.images[0].path} alt={'Orderd Product'} />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText primary={product.name} secondary={`サイズ：${product.size}`} />
              <ListItemText primary={`¥${product.price.toLocaleString()}`} />
            </div>
            <PrimaryButton label={'商品の詳細を見る'} onClick={() => goToProductDetail(product.id)} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  )
}

export default OrderedProducts
