import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../productList/ProductList';
import './plp.scss';

export default class PLP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            cart: []
        }
       
    }

    render() {
        let { id } = this.props.match.params;
        let details = this.props.location.state;
        const {categoryList, cart} = this.state;
        const selectedCategory = details ? 
                                    categoryList.find(category => category.id === details.id) : 
                                    id ? categoryList.find(category => category.key === id) : {};
        return (
            <section className='section-plp row section-main'>
                <div className='left-col-plp'>
                    <nav className='left-vertical-nav'>
                        {categoryList.map(item => {
                            return (
                                <Link key={item.key} to={{pathname : '/plp/'+ item.key, state: {id: item.id}}}>{item.name}</Link>
                            )
                        })}
                    </nav>
                </div>
                <div className='right-col-plp'>
                    <ProductList cart={this.props.cart} category={selectedCategory}/>
                </div>
            </section>
        )
    }
   
    componentDidMount() {
        this.setState({
            categoryList: this.props.categoryList
        })
    }

    componentDidUpdate() {
        if(this.props.categoryList.length === 0){
            setTimeout(() => {
                this.setState({
                    categoryList: this.props.categoryList
                })
            }, 100);
        }
    }

    updateCart = (cart) => {
        this.setState({
            cart
        }, () => {
            localStorage.clear();
            localStorage.setItem('cart', JSON.stringify(cart))
        })
    }
}