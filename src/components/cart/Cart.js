import React from 'react';
import './cart.scss';
import CartItem from '../common/cartItem/CartItem';

export default class Cart extends React.Component {
    render() {
        let cart = [...this.props.cart];
        return(
            <aside className="cart-container"> 
                <div className="row section-main">
                    <section className="section-cart">
                        <header className="header-cart">
                            <p>My Cart</p>
                            <i onClick={() => this.props.showCart(false)}>X</i>
                        </header>
                        <section>
                            {cart.map(item => {
                                return (
                                    <CartItem  key={item.id} item={item} updateCart={this.updateCart}/>
                                )
                            })}
                        </section>
                        <footer>
                            <p>Promo code can be applied on payment page</p>
                            <button className="btn-full btn-checkout">Proceed to Checkout</button>
                        </footer>
                    </section>
                </div>
                
            </aside>
        )
    }

    updateCart = (item, action) => {
        
    }
}