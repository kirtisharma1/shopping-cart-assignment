import React, { useState, useEffect } from 'react';
import Category from '../../molecules/category/Category';
import Carousel from '../../molecules/carousel/Carousel';
import { GET_BANNERS, HOME_PAGE_ARIA_LABEL } from '../../../constants';

export default function Home(props) {
  const categoryList = props.categoryList;
  const [banners, setBanners] = useState([]);

  const getBanners = () => {
    fetch(GET_BANNERS)
      .then(res => res.json())
      .then(res => setBanners(res));
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <ul className='section-main section-home'>
      <Carousel banners={banners} />
      {categoryList.map((category, i) => {
        return (
          <Category key={category.key} details={category} className={i % 2 ? 'even' : 'odd'} />
        )
      })}
    </ul>
  )
}