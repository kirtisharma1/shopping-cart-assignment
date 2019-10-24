import React, { useState, useEffect } from 'react';
import Category from './../common/category/Category';
import Carousel from './../carousel/Carousel';
import { GET_BANNERS } from '../../constants';

export default function Home(props) {
    const categoryList = props.categoryList;
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        getBanners();
    }, [])
    
    const getBanners = () => {
        fetch(GET_BANNERS)
        .then(res => res.json())
        .then(banners => setBanners(banners));
    }

    return (
        <section className='section-main section-home'>
            <Carousel banners={banners}/>
        {/* <section className='section-main'>
            <div>
                Carousal
            </div> */}
            {categoryList.map((category, i) => {
                return (
                    <Category key={category.key} details={category} className={i%2 ? 'even' : 'odd'}/>
                )
            })}
        </section>
    )
}