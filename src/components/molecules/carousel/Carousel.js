import React, { useState, useEffect } from 'react';
import * as constHome from '../../../constants/home';
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

  return (
    <>
      <li className="slideshow row" aria-label={constHome.CAROUSEL_ARIA_LABEL}>
        {banners.map(banner => {
          return (
            <div className={"slideshow__slides" + (currentBanner.id ? banner.id === currentBanner.id ? "--selected" : '' : banner.order === 1 ? "--selected" : '')} key={banner.id}>
              <img src={banner.bannerImageUrl} alt={banner.bannerImageAlt} />
            </div>
          )
        })}
        <button aria-label={constHome.PREV_BUTTON_ARIA_LABEL} className="slideshow__prev" onClick={() => setBanner('prev')}>{constHome.PREV_LABEL}</button>
        <button aria-label={constHome.NEXT_BUTTON_ARIA_LABEL} className="slideshow__next" onClick={() => setBanner('next')}>{constHome.NEXT_LABEL}</button>
        <ul className="slideshow__dots-container">
          {banners.map(banner => {
            return (
              <li key={banner.id} className={"slideshow__dots-container__dot " + (currentBanner.id ? banner.id === currentBanner.id ? " active" : '' : banner.order === 1 ? " active" : '')} onClick={() => setCurrentBanner(banner)}></li>
            )
          })}
        </ul>
      </li>
    </>
  )
}