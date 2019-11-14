import React from 'react';
import { CURRENCY } from '../../../constants';
import { ADD_ITEM_TO_CART_ARIA_LABEL, SUBTRACT_ITEM_FROM_CART_ARIA_LABEL } from '../../../constants/cart';
import Figure from '../../atoms/figure/Figure';
import Image from '../../atoms/image/Image';
import './cartItem.scss';
import Button from '../../atoms/button/Button';

export default function CartItem(props) {
  const { item, updateCart } = props;
  return (
    <li className="cart-item" aria-label={item.name}>
      <Figure className="cart-item__image-container">
        <Image className="cart-item__image-container__image" src={item.imageURL} alt='Product Image' />
      </Figure>
      <div className="cart-item__details">
        <h3 className="cart-item__details__title">{item.name}</h3>
        <div className="cart-item__details__price-quantity">
          <div className="cart-item__controls">
            <Button 
              className="btn-full cart-item__controls__substract" 
              onClick={() => updateCart(item, 'substract')} 
              aria-label={SUBTRACT_ITEM_FROM_CART_ARIA_LABEL + ' ' + item.quantity}
            >
              <span className="cart-item__controls__substract__text">-</span>
            </Button>
            <span>{item.quantity}</span>
            <Button 
              className="btn-full cart-item__controls__add" 
              onClick={() => updateCart(item, 'add')} 
              aria-label={ADD_ITEM_TO_CART_ARIA_LABEL + ' ' + item.quantity}
            >
              <span className="cart-item__controls__add__text">+</span>
            </Button>
            <span>X</span>
            <span className="cart-item__details__price-quantity__price">{item.price}</span>
          </div>
          <div className="cart-item__details__price-quantity__total">{CURRENCY + item.price * item.quantity}</div>
        </div>
      </div>
    </li>
  )
}