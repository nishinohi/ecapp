import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { PrimaryButtonProps } from './types'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#4dd0e1',
    color: '#000',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
})

const PrimaryButton = (props: PrimaryButtonProps): JSX.Element => {
  const classes = useStyles()

  return (
    <Button variant="contained" onClick={() => props.onClick()} className={classes.button}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton
