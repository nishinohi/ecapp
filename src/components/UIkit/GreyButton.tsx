import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { PrimaryButtonProps } from './types'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.grey['300'],
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
}))

const GreyButton = (props: PrimaryButtonProps): JSX.Element => {
  const classes = useStyles()

  return (
    <Button variant="contained" onClick={() => props.onClick()} className={classes.button}>
      {props.label}
    </Button>
  )
}

export default GreyButton
