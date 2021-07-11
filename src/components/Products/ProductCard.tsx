import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Image } from './types'
import NoImage from '../../assets/img/src/no_image.png'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

type ProductCardProps = {
  id: string
  images: Image[]
  name: string
  price: number
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}))

const ProductCard = (props: ProductCardProps): JSX.Element => {
  const classes = useStyles()
  const images = props.images.length > 0 ? props.images : [{ id: '', path: NoImage }]
  const price = props.price.toLocaleString()

  const dispatch = useDispatch()

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        title=""
        onClick={() => dispatch(push(`/product/${props.id}`))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push(`/product/${props.id}`))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography className={classes.price} color="textSecondary" component="p">
            ¥{price}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
