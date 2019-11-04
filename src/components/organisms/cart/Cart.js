import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../molecules/cartItem/CartItem';
import EventEmitter from '../../../utils/event';
import { ADD_TO_CART, UPDATE_CART, CURRENCY } from '../../../constants';
import * as const_cart from '../../../constants/cart';
import './cart.scss';

export default function Cart(props) {
  const cart = [...props.cart];
  const updateCart = (item, action) => {
    const cart = [...props.cart];
    let index = cart.findIndex(prod => prod.id == item.id);
    if (index >= 0) {
      if (action === 'add') {
        cart[index] = Object.assign({}, cart[index], {
          quantity: cart[index].quantity + 1,
        });
      } else {
        if (cart[index].quantity === 1) {
          cart.splice(index, 1);
        } else {
          cart[index] = Object.assign({}, cart[index], {
            quantity: cart[index].quantity - 1,
          });
        }
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
          if (res) {
            EventEmitter.emitEvent(UPDATE_CART, cart)
          }
        });
    }
  }

  return (
    <aside className="cart-container" role="dialog" aria-modal="true">
      <div className="row section-main">
        <section className="cart">
          <header className="cart__header">
            <p tabIndex="0">{const_cart.CART_TITLE}</p>
            <i tabIndex="0" aria-label={const_cart.CLOSE_CART_ARIA_LABEL} onClick={() => props.showCart(false)}>X</i>
          </header>
          <section className={"cart__body" + (cart.length === 0 ? "--empty" : "")}>
            {cart.map(item => {
              return (
                <CartItem key={item.id} item={item} updateCart={updateCart} />
              )
            })}
            {cart.length === 0 ? <div>
              <p>{const_cart.EMPTY_CART_TEXT_LINE1}</p>
              <p>{const_cart.EMPTY_CART_TEXT_LINE2}</p>
            </div> : <div className="cart__body__lowest-price">
                <img src={const_cart.LOWEST_PRICE_IMG} alt={const_cart.LOWEST_PRICE_IMG_ALT}></img>
                <span>{const_cart.LOWEST_PRICE_TEXT}</span>
              </div>}
          </section>
          <footer className={cart.length === 0 ? "empty-cart" : ""}>
            {cart.length === 0 ?
              <Link className="btn-full btn-shopping" to='/plp?id=all' onClick={() => {
                if (props.showCart) props.showCart(false)
              }}>
                {const_cart.EMPTY_CART_BUTTON_TEXT}
              </Link> :
              <>
                <p>{const_cart.PROMO_CODE_TEXT}</p>
                <button className="btn-full btn-checkout">
                  <span>{const_cart.CHECKOUT_BUTTON_TEXT}</span>
                  <span>{CURRENCY + cart.reduce((a, b) => a + (b['price'] * b['quantity'] || 0), 0)} &ensp;&gt;</span>
                </button>
              </>
            }
          </footer>
        </section>
      </div>
    </aside>
  )
}

