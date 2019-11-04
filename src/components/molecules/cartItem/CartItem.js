import React from 'react';
import { CURRENCY } from '../../../constants';
import { ADD_ITEM_TO_CART_ARIA_LABEL, SUBTRACT_ITEM_FROM_CART_ARIA_LABEL } from '../../../constants/cart';
import './cartItem.scss';

export default function CartItem(props) {
    const item = props.item;
    return (
        <article className="cart-item" aria-label={item.name} tabIndex="0">
            <figure>
                <img src={item.imageURL} alt='Product Image'></img>
            </figure>
            <div className="cart-item__details">
                <h3>{item.name}</h3>
                <div className="cart-item__details__price-quantity">
                    <div>
                        <button className="btn-full cart-item__details__price-quantity__substract" onClick={() => props.updateCart(item, 'substract')} aria-label={SUBTRACT_ITEM_FROM_CART_ARIA_LABEL + ' '+ item.quantity}><span>-</span></button>
                        <span>{item.quantity}</span>
                        <button className="btn-full cart-item__details__price-quantity__add" onClick={() => props.updateCart(item, 'add')} aria-label={ADD_ITEM_TO_CART_ARIA_LABEL + ' '+ item.quantity}><span>+</span></button>
                        <span>X</span>
                        <span className="cart-item__details__price-quantity__price">{item.price}</span>
                    </div>
                    <div className="cart-item__details__price-quantity__item-total">{CURRENCY + item.price * item.quantity}</div>
                </div>
            </div>
            
        </article>
    )
}