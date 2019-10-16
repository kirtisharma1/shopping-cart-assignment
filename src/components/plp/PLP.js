import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

    useEffect(() => {
        if(!props.categoryList) {
            // props.fetchRules();
        }
        console.log('mount it!');
    }, []);

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
            <Menu categoryList={categoryList}/>
            
            <div className='right-col-plp'>
                <ProductList cart={cart} category={selectedCategory}/>
            </div>
        </section>
    )
}

function DropDown(props) {
    const onChange = (e) => {
        props.history.push(`/${e.target.value}`);
    }
    return (
    <select className='dropdown-nav' onChange={onChange}>
        {props.categoryList.map(item => {
            return (
                <option key={item.key} value={'plp/'+item.key}>{item.name}</option>
            )
        })}
    </select>
    );
}
  
const Menu = withRouter(DropDown);