import { List, makeStyles } from '@material-ui/core'
import { OrderHistoryItem } from 'components/Products'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { fetchOrderedHistory } from 'reducks/users/operations'
import { getOrders } from 'reducks/users/selectors'

const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey['100'],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '768',
    },
  },
}))

const OrderHistory = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state: AppState) => state)
  const orders = getOrders(selector)

  useEffect(() => {
    dispatch(fetchOrderedHistory())
  }, [])

  console.log(orders)

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
        {orders.length > 0 && orders.map((order) => <OrderHistoryItem order={order} key={order.id} />)}
      </List>
    </section>
  )
}

export default OrderHistory
