export type ImageAreaProps = {
  setImages: (value: React.SetStateAction<Image[]>) => void
  images: Image[]
}

export type Image = {
  id: string
  path: string
}
