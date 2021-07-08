import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'

const TextInput = (props: TextFieldProps): JSX.Element => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput
