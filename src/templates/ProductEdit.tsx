import { TextInput, SelectBox, PrimaryButton } from 'components/UIkit/index'
import ImageArea from 'components/Products/ImageArea'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveProduct } from 'reducks/products/operation'
import { Image, Size } from 'components/Products/types'
import { useEffect } from 'react'
import { db } from '../firebase'
import { SetSizeArea } from 'components/Products'

const ProductEdit = (): JSX.Element => {
  const dispatch = useDispatch()

  let id = window.location.pathname.split('/product/edit')[1]

  if (id !== '') {
    id = id.split('/')[1]
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState<Image[]>([]),
    [price, setPrice] = useState(''),
    [sizes, setSizes] = useState<Size[]>([])

  const inputName = useCallback((event) => setName(event.target.value), [setName])
  const inputDescription = useCallback((event) => setDescription(event.target.value), [setDescription])
  // const inputCategory = useCallback((event) => setCategory(event.target.value), [setCategory])
  // const inputGender = useCallback((event) => setGender(event.target.value), [setGender])
  const inputPrice = useCallback((event) => setPrice(event.target.value), [setPrice])

  const categories = [
    {
      id: 'tops',
      name: 'トップス',
    },
    {
      id: 'bottom',
      name: 'ボトム',
    },
    {
      id: 'shirt',
      name: 'シャツ',
    },
  ]

  const genders = [
    {
      id: 'male',
      name: 'メンズ',
    },
    {
      id: 'female',
      name: 'レディース',
    },
    {
      id: 'all',
      name: '全て',
    },
  ]

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data()
          if (!data) throw new Error('選択された商品が登録されていません')
          setImages(data.images)
          setName(data.name)
          setDescription(data.description)
          setCategory(data.category)
          setGender(data.gender)
          setPrice(data.price)
          setSizes(data.sizes)
        })
    }
  }, [id])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label="商品名"
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type="text"
        />
        <TextInput
          fullWidth={true}
          label="商品説明"
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type="text"
        />
        <SelectBox
          label="カテゴリ"
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        ></SelectBox>
        <SelectBox label="性別" required={true} options={genders} select={setGender} value={gender}></SelectBox>
        <TextInput
          fullWidth={true}
          label="価格"
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type="number"
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label="商品情報を保存"
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
          ></PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export default ProductEdit
