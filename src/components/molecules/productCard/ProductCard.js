import React from 'react';
import EventEmitter from '../../../utils/event';
import Figure from '../../atoms/figure/Figure';
import Image from '../../atoms/image/Image';
import Button from '../../atoms/button/Button';
import {
  ADD_TO_CART, UPDATE_CART, CURRENCY, PRICE_PREFIX, BUY_BUTTON_TEXT,
} from '../../../constants';
import './productCard.scss';

export default function ProductCard(props) {
  const { cart, product } = props;

  const addToCart = () => {
    const updatedCart = [...cart];
    let newProduct = { ...product, quantity: 1 };
    let index = updatedCart.findIndex(item => item.id === newProduct.id);
    if (index >= 0) {
      updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity + 1 };
    } else {
      updatedCart.push(newProduct);
    }
    fetch(ADD_TO_CART, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCart),
    }).then(res => res.json())
      .then(res => {
        if (res) {
          EventEmitter.emitEvent(UPDATE_CART, updatedCart)
        }
      });
  }

  return (
    <li className="product" aria-label={product.name}>
      <h3 className="product__title">{product.name}</h3>
      <Figure className="product__photo">
        <Image className="product__photo__image" src={product.imageURL} alt="Product Image" />
        <figcaption className="product__photo__caption">
          <div className="product__photo__caption__description" >{product.description}</div>
        </figcaption>
      </Figure>
      <div className="product__price">
        <span className="product__price__text">{PRICE_PREFIX + ' ' + CURRENCY + product.price}</span>
        <Button className="btn-full product__price__btn-buy" onClick={addToCart}>
          {BUY_BUTTON_TEXT}
          {' '}
          <span className="product__price__btn-buy__text">@ {CURRENCY + product.price}</span>
        </Button>
      </div>
    </li>
  );
}