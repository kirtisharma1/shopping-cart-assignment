import React, { useState, useEffect } from 'react';
import * as constHome from '../../../constants/home';
import Image from '../../atoms/image/Image';
import Button from '../../atoms/button/Button';
import './carousel.scss';

export default function Carousel(props) {
  const { banners } = props;
  const [currentBanner, setCurrentBanner] = useState({});

  useEffect(() => {
    if (banners.length !== 0) {
      setCurrentBanner(banners[0]);
    }
  }, [props]);

  const setBanner = (type) => {
    let index = banners.findIndex(item => item.id === currentBanner.id);
    if (type === 'prev') {
      if (index === 0) {
        index = banners.length - 1;
      } else {
        index = index - 1;
      }
    } else if (type === 'next') {
      if (index === banners.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
    }
    setCurrentBanner(banners[index]);
  }

  const jumpToBanner = (e, banner) => {
    if(e.keyCode === 13){
      setCurrentBanner(banner);
    }
  }

  return (
    <>
      <li className="slideshow row">
        {banners.map(banner => {
          return (
            <div className={"slideshow__slides" + (currentBanner.id ? banner.id === currentBanner.id ? "--selected" : '' : banner.order === 1 ? "--selected" : '')} key={banner.id}>
              <Image src={banner.bannerImageUrl} alt={banner.bannerImageAlt} />
            </div>
          )
        })}
        <Button aria-label={constHome.PREV_BUTTON_ARIA_LABEL} className="slideshow__prev" onClick={() => setBanner('prev')}>
          {constHome.PREV_LABEL}
        </Button>
        <Button aria-label={constHome.NEXT_BUTTON_ARIA_LABEL} className="slideshow__next" onClick={() => setBanner('next')}>
          {constHome.NEXT_LABEL}
        </Button>
        <ul className="slideshow__dots-container">
          {banners.map(banner => {
            return (
              <li key={banner.id} tabIndex="0" className={"slideshow__dots-container__dot " + (currentBanner.id ? banner.id === currentBanner.id ? " active" : '' : banner.order === 1 ? " active" : '')} onClick={() => setCurrentBanner(banner)} onKeyDown={(e) => jumpToBanner(e, banner)}></li>
            )
          })}
        </ul>
      </li>
    </>
  )
}