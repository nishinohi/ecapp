import React from 'react'
import { useState } from 'react'
import NoImage from '../../assets/img/src/no_image.png'
import { Image } from './types'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

type ImageSwiperProps = {
  images: Image[]
}

const ImageSwiper = (props: ImageSwiperProps): JSX.Element => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dunamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  })

  const images = props.images

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="no image" />
        </div>
      ) : (
        images.map((image, index) => (
          <div key={index}>
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  )
}

export default ImageSwiper
