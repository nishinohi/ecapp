import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import { useCallback } from 'react'
import { storage } from '../../firebase'
import { Image, ImageAreaProps } from './types'
import ImagePreview from './ImagePreview'

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
})

const ImageArea = (props: ImageAreaProps): JSX.Element => {
  const classes = useStyles()

  const deleteImage = useCallback(
    async (id: string) => {
      const ret = window.confirm('この画像を削除しますか？')
      if (!ret) return false

      const newImages = props.images.filter((image) => image.id !== id)
      props.setImages(newImages)
      try {
        storage.ref('images').child(id).delete()
        return true
      } catch (error) {
        return false
      }
    },
    [props.images]
  )

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files
      const blob = new Blob(file, { type: 'image/jpeg' })
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')

      const uploadRef = storage.ref('images').child(fileName)
      const uploadTask = uploadRef.put(blob)

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const newImage: Image = { id: fileName, path: downloadUrl as string }
          props.setImages((prev) => [...prev, newImage])
        })
      })
    },
    [props.setImages]
  )

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview id={image.id} path={image.path} key={image.id} delete={deleteImage} />
          ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" onChange={(event) => uploadImage(event)} />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
