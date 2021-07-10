import React from 'react'

type ImagePreviewProps = {
  id: string
  path: string
  delete: (id: string) => Promise<boolean>
}

const ImagePreview = (props: ImagePreviewProps): JSX.Element => {
  return (
    <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
      <img alt="プレビュー画像" src={props.path} />
    </div>
  )
}

export default ImagePreview
