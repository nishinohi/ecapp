import React from 'react'
import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, IconButton, TableCell } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/styles'
import { TextInput } from '../UIkit/index'
import { useState } from 'react'
import { useCallback } from 'react'
import { Size } from './types'
import { useMemo } from 'react'

type SetSizeAreaProps = {
  sizes: Size[]
  setSizes: React.Dispatch<React.SetStateAction<Size[]>>
}

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
})

const SetSizeArea = (props: SetSizeAreaProps): JSX.Element => {
  const classes = useStyles()

  const [index, setIndex] = useState(0),
    [size, setSize] = useState(''),
    [quantity, setQuantity] = useState(0)

  const inputSize = useCallback((event) => setSize(event.target.value), [setSize])
  const inputQuantity = useCallback((event) => setQuantity(event.target.value), [setQuantity])

  const addOrEditSize = (index: number, size: string, quantity: number): boolean => {
    if (size === '') return false

    // new
    if (index === props.sizes.length) {
      props.setSizes((prev) => [...prev, { size: size, quantity: quantity }])
      // initial input field
      setIndex(index + 1)
      setSize('')
      setQuantity(0)
      return true
    }

    // edit
    const newSizes = props.sizes
    newSizes[index] = { size: size, quantity: quantity }
    props.setSizes(newSizes)
    // initial input field
    setIndex(newSizes.length)
    setSize('')
    setQuantity(0)

    return true
  }

  const editSize = (index: number, size: string, quantity: number): boolean => {
    setIndex(index)
    setSize(size)
    setQuantity(quantity)
    return true
  }

  const deleteSize = (deleteIndex: number) => {
    const newSizes = props.sizes.filter((size, index) => index !== deleteIndex)
    props.setSizes(newSizes)
  }

  useMemo(() => {
    if (props.sizes) {
      setIndex(props.sizes.length)
    }
  }, [props.sizes.length])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, ii) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => editSize(ii, item.size, item.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => deleteSize(ii)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label="サイズ"
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type="text"
          ></TextInput>
          <TextInput
            fullWidth={false}
            label="数量"
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type="number"
          ></TextInput>
          <IconButton className={classes.checkIcon} onClick={() => addOrEditSize(index, size, quantity)}>
            <CheckCircleIcon />
          </IconButton>
        </div>
      </TableContainer>
    </div>
  )
}

export default SetSizeArea
