import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../productList/ProductList';
import './plp.scss';

export default function PLP(props) {
    let { id } = props.match.params;
    let details = props.location.state;
    const categoryList = props.categoryList;
    const cart = props.cart;
    const selectedCategory = details ? 
                                categoryList.find(category => category.id === details.id) : 
                                id ? categoryList.find(category => category.key === id) : {};
    return (
        <section className='section-plp row section-main'>
            <div className='left-col-plp'>
                <nav className='left-vertical-nav'>
                    {categoryList.map(item => {
                        return (
                            <Link key={item.key} to={{pathname : '/plp/'+ item.key, state: {id: item.id}}}>{item.name}</Link>
                        )
                    })}
                </nav>
            </div>
            <div className='right-col-plp'>
                <ProductList cart={cart} category={selectedCategory}/>
            </div>
        </section>
    )
}