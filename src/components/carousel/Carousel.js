import React, {useState, useEffect} from 'react';
import * as const_home from '../../constants/home';
import './carousel.scss';

export default function Carousel(props) {
    const {banners} = props;
    const [currentBanner, setCurrentBanner] = useState({});    

    useEffect(() => {
        if(banners.length !== 0){
            setCurrentBanner(banners[0]);
        }
    }, [props]);

    const setBanner = (type) => {
        let index = banners.findIndex(item => item.id === currentBanner.id);
        if(type === 'prev') {
            if(index === 0){
                index = banners.length - 1;
            }else {
                index = index - 1;
            }
        }else if(type === 'next') {
            if(index === banners.length - 1){
                index = 0;
            }else {
                index = index + 1;
            }
        }
        setCurrentBanner(banners[index]);
    }

    return (
        <>
            <section className="slideshow-container row">
                {banners.map(banner => {
                    return (
                        <div className={"my-slides " + (currentBanner.id ? banner.id === currentBanner.id ? " selected" : '' : banner.order === 1 ? " selected" : '')} key={banner.id}>
                            <img src={banner.bannerImageUrl} alt={banner.bannerImageAlt}/>
                        </div>
                    )
                })}
                <button className="prev" tabIndex="0" onClick={() => setBanner('prev')}>{const_home.PREV_LABEL}</button>
                <button className="next" tabIndex="0" onClick={() => setBanner('next')}>{const_home.NEXT_LABEL}</button>
                <div className="dots-container">
                    {banners.map(banner => {
                        return (
                            <span key={banner.id} className={"dot " + (currentBanner.id ? banner.id === currentBanner.id ? " active" : '' : banner.order === 1 ? " active" : '')} onClick={() => setCurrentBanner(banner)}></span> 
                        )
                    })}
                </div>
            </section>
        </>
    )
}