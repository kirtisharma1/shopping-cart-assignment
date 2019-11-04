import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProductList from '../productList/ProductList';
import DropDown from '../../atoms/dropDown/DropDown';
import './plp.scss';

const Menu = withRouter(DropDown);

export default function PLP(props) {
    let { id } = props.match.params;
    let details = props.location.state;
    const categoryList = props.categoryList;
    const cart = props.cart;
    const selectedCategory = details ? 
                                categoryList.find(category => category.id === details.id) : 
                                id ? categoryList.find(category => category.key === id) : {};

    return (
        <section className='plp row section-main'>
            <div className='plp__left-col'>
                <div className='plp__left-col__vertical-nav'>
                    {categoryList.map(item => {
                        return (
                            <Link key={item.key} to={{pathname : '/plp/'+ item.key, state: {id: item.id}}} className={selectedCategory && item.id === selectedCategory.id ? 'selected': ''}>{item.name}</Link>
                        )
                    })}
                </div>
            </div>
            <Menu categoryList={categoryList} url='plp/'/>
            
            <div className='plp__right-col'>
                <ProductList cart={cart} category={selectedCategory}/>
            </div>
        </section>
    )
}