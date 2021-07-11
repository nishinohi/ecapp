import React from 'react'
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { SelectBoxProps } from './types'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
})

export const SelectBox = (props: SelectBoxProps): JSX.Element => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value as string)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox
