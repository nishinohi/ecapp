import { Divider } from '@material-ui/core'
import { TextDetail } from 'components/UIkit'
import React from 'react'
import { OrderHistoty } from 'reducks/products/types'
import OrderedProducts from './OrderedProducts'

type OrderHistoryItemProps = {
  order: OrderHistoty
}

const dateTimeToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    `00${date.getMonth() + 1}`.slice(-2) +
    '-' +
    `00${date.getDay() + 1}`.slice(-2) +
    ' ' +
    `00${date.getHours() + 1}`.slice(-2) +
    ':' +
    `00${date.getMinutes() + 1}`.slice(-2) +
    ':' +
    `00${date.getSeconds() + 1}`.slice(-2)
  )
}

const OrderHistoryItem = (props: OrderHistoryItemProps): JSX.Element => {
  const order = props.order
  const price = `¥${order.amount}`
  const orderedDateTime = dateTimeToString(order.updated_at.toDate())
  const shippingDate = dateTimeToString(order.shippingDate.toDate())

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={'注文ID'} value={order.id} />
      <TextDetail label={'注文日時'} value={orderedDateTime} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={price} />
      {order.products.length > 0 && <OrderedProducts products={order.products} />}
      <div className="module-spacer--small" />
      <Divider />
    </div>
  )
}

export default OrderHistoryItem
