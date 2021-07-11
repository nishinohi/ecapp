import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from 'reducks/products/operation'
import { getProducts } from 'reducks/products/selectors'
import { AppState } from 'reducks/store/store'
import { ProductCard } from 'components/Products'

const ProductList = (): JSX.Element => {
  const dispatch = useDispatch()
  const selector = useSelector((state: AppState) => state)
  const products = getProducts(selector)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              key={product.id}
            />
          ))}
      </div>
    </section>
  )
}

export default ProductList
