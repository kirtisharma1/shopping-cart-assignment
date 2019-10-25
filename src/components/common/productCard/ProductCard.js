import React from 'react';
import EventEmitter from '../../../utils/event';
import { ADD_TO_CART, UPDATE_CART, CURRENCY, PRICE_PREFIX, BUY_BUTTON_TEXT } from '../../../constants';
import './productCard.scss';

export default function ProductCard(props){
    const product = props.product;

    const addToCart = () => {
        const cart = [...props.cart];
        let product = Object.assign({}, props.product, {
            quantity: 1
        });
        
        let index = cart.findIndex(item => item.id == product.id);
        if(index >= 0){
            cart[index] = Object.assign({}, cart[index], {
                quantity: cart[index].quantity+1,
            });
        }else {
            cart.push(product);
        }
        fetch(ADD_TO_CART, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        }).then(res => res.json())
        .then(res => {
            if(res){
                EventEmitter.emitEvent(UPDATE_CART, cart)
            }
        });
    }

    return (
        <article className='article-product-card' tabIndex="0" aria-label={product.name}>
            <h3>{product.name}</h3>
            <figure className="product-photo">
                <img src={product.imageURL} alt="Product Image"></img>
                <figcaption tabIndex="0"><div>{product.description}</div></figcaption>
            </figure>
            <div className='product-price-container'>
                <span tabIndex="0">{PRICE_PREFIX + ' ' + CURRENCY + product.price}</span>
                <button className='btn-full btn-buy' onClick={addToCart}>{BUY_BUTTON_TEXT} <span>@ {CURRENCY + product.price}</span></button>
            </div>
        </article>
    )
}