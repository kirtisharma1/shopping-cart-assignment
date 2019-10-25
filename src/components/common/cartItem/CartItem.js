import React from 'react';
import { CURRENCY } from '../../../constants';
import { ADD_ITEM_TO_CART_ARIA_LABEL, SUBTRACT_ITEM_FROM_CART_ARIA_LABEL } from '../../../constants/cart';
import './cartItem.scss';

export default function CartItem(props) {
    const item = props.item;
    return (
        <article className="article-cart" aria-label={item.name} tabIndex="0">
            <figure>
                <img src={item.imageURL} alt='Product Image'></img>
            </figure>
            <div className="item-details">
                <h3>{item.name}</h3>
                <div className="price-quantity">
                    <div>
                        <button className="btn-full" onClick={() => props.updateCart(item, 'substract')} aria-label={SUBTRACT_ITEM_FROM_CART_ARIA_LABEL + ' '+ item.quantity}><span>-</span></button>
                        <span>{item.quantity}</span>
                        <button className="btn-full" onClick={() => props.updateCart(item, 'add')} aria-label={ADD_ITEM_TO_CART_ARIA_LABEL + ' '+ item.quantity}><span>+</span></button>
                        <span>X</span>
                        <span className="price">{item.price}</span>
                    </div>
                    <div className="item-total">{CURRENCY + item.price * item.quantity}</div>
                </div>
            </div>
            
        </article>
    )
}