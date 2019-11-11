import React from 'react';
import EventEmitter from '../../../utils/event';
import {
  ADD_TO_CART, UPDATE_CART, CURRENCY, PRICE_PREFIX, BUY_BUTTON_TEXT,
} from '../../../constants';
import './productCard.scss';

export default function ProductCard(props) {
  const { cart, product } = props;

  const addToCart = () => {
    let newProduct = { ...product, quantity: 1 };
    let index = cart.findIndex(item => item.id === newProduct.id);
    if (index >= 0) {
      cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
    } else {
      cart.push(newProduct);
    }
    fetch(ADD_TO_CART, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart),
    }).then(res => res.json())
      .then(res => {
        if (res) {
          EventEmitter.emitEvent(UPDATE_CART, cart)
        }
      });
  }

  return (
    <li className='product' aria-label={product.name}>
      <h3>{product.name}</h3>
      <figure className="product__photo">
        <img src={product.imageURL} alt="Product Image"></img>
        <figcaption ><div>{product.description}</div></figcaption>
      </figure>
      <div className='product__price'>
        <span >{PRICE_PREFIX + ' ' + CURRENCY + product.price}</span>
        <button type="button" className='btn-full product__price__btn-buy' onClick={addToCart}>
          {BUY_BUTTON_TEXT}
          {' '}
          <span>@ {CURRENCY + product.price}</span>
        </button>
      </div>
    </li>
  );
}