import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../common/cartItem/CartItem';
import EventEmitter from '../../event';

import { ADD_TO_CART, LOWEST_PRICE } from '../../constants';
import './cart.scss';

export default function Cart(props) {
    const cart = [...props.cart];
    const updateCart = (item, action) => {   
        const cart = [...props.cart];   
        let index = cart.findIndex(prod => prod.id == item.id);
        if(index >= 0){
            if(action === 'add'){
                cart[index] = Object.assign({}, cart[index], {
                    quantity: cart[index].quantity + 1,
                });
            }else {
                if(cart[index].quantity === 1){
                    cart.splice(index, 1);
                }else {
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
                if(res){
                    EventEmitter.emitEvent('updateCart', cart)
                }
            });
        }
        
    }

    return(
        <aside className="cart-container"> 
            <div className="row section-main">
                <section className="section-cart">
                    <header className="header-cart">
                        <p tabIndex="0">My Cart</p>
                        <i  tabIndex="0" aria-label="Close Cart" onClick={() => props.showCart(false)}>X</i>
                    </header>
                    <section className={cart.length === 0 ? "empty-cart" : ""}>
                        {cart.map(item => {
                            return (
                                <CartItem  key={item.id} item={item} updateCart={updateCart}/>
                            )
                        })}
                        {cart.length === 0 ? <div>
                            <p>No items in your cart</p>
                            <p>Your favourite items are just a click away</p>
                        </div> : <div className="lowest-price">
                            <img src={LOWEST_PRICE} alt="Lowest Price Image"></img>
                            <span>You won't find it cheaper anywhere</span>
                        </div>}
                    </section>
                    <footer className={cart.length === 0 ? "empty-cart" : ""}>
                        {cart.length === 0 ? 
                        <Link className="btn-full btn-shopping" to='/plp?id=all' onClick={() => {
                            if(props.showCart)props.showCart(false)
                        }}>Start Shopping</Link> : 
                        <>
                            <p>Promo code can be applied on payment page</p>
                            <button className="btn-full btn-checkout">
                                <span>Proceed to Checkout</span>
                                <span>Rs.{cart.reduce((a, b) => a + (b['price'] * b['quantity'] || 0), 0)} &ensp;&gt;</span>    
                            </button>
                        </>
                        }
                    </footer>
                </section>
            </div>
        </aside>
    )
}

    