import React from 'react';
import Category from './../common/category/Category';

export default function Home(props) {
    const categoryList = props.categoryList;

    return (
        <section className='section-main'>
            <div>
                Carousal
            </div>
            {categoryList.map((category, i) => {
                return (
                    <Category key={category.key} details={category} className={i%2 ? 'even' : 'odd'}/>
                )
            })}
        </section>
    )
}