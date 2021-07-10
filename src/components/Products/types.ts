export type ImageAreaProps = {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>
  images: Image[]
}

export type Image = {
  id: string
  path: string
}

export type Size = {
  size: string
  quantity: number
}
