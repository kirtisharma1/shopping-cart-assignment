import React, { useEffect, useRef } from 'react';
import NavLink from '../../atoms/link/NavLink';
import CartItem from '../../molecules/cartItem/CartItem';
import EventEmitter from '../../../utils/event';
import { ADD_TO_CART, UPDATE_CART, CURRENCY } from '../../../constants';
import * as constCart from '../../../constants/cart';
import { checkScreen } from '../../../utils/abstract';
import './cart.scss';

export default function Cart(props) {
  const { cart } = props;
  const cartRef = useRef(null);
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

  const checkFocus = (e) => {
    if(e.keyCode === 9){
      focusOnTop(e);
    }
  }

  const focusOnTop = (e) => {
    if(!checkScreen()){
      if(e){
        e.preventDefault();
      }
      cartRef.current.focus();
    }
  }

  useEffect(() => {
    focusOnTop();
  }, []);

  return (
    <aside className="cart-container" role="dialog" aria-modal="true">
      <div className="row section-main">
        <section className="cart">
          <header className="cart__header">
            <p >{constCart.CART_TITLE}</p>
            <button ref={cartRef} className="cart__close" aria-label={constCart.CLOSE_CART_ARIA_LABEL} onClick={() => props.showCart(false)}>&times;</button>
          </header>
          <ul className={"cart__body" + (cart.length === 0 ? "--empty" : "")}>
            {cart.map(item => {
              return (
                <CartItem key={item.id} item={item} updateCart={updateCart} />
              )
            })}
            {cart.length === 0 ? <div>
              <p>{constCart.EMPTY_CART_TEXT_LINE1}</p>
              <p>{constCart.EMPTY_CART_TEXT_LINE2}</p>
            </div> : <div className="cart__body__lowest-price">
                <img src={constCart.LOWEST_PRICE_IMG} alt={constCart.LOWEST_PRICE_IMG_ALT}></img>
                <span>{constCart.LOWEST_PRICE_TEXT}</span>
              </div>}
          </ul>
          <footer className={cart.length === 0 ? "empty-cart" : ""}>
            {cart.length === 0 ?
              <NavLink className="btn-full btn-shopping" to='/plp?id=all' onClick={() => {
                if (props.showCart) props.showCart(false)
              }}>
                {constCart.EMPTY_CART_BUTTON_TEXT}
              </NavLink> :
              <>
                <p>{constCart.PROMO_CODE_TEXT}</p>
                <button className="btn-full btn-checkout" onKeyDown={checkFocus}>
                  <span>{constCart.CHECKOUT_BUTTON_TEXT}</span>
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

