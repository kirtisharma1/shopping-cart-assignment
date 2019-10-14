import React from 'react';
import ProductCard from '../common/productCard/ProductCard';
import { GET_PRODUCTS } from '../../constants';

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            productList: []
        }
    }

    render() {
        let { category, productList } = this.state;
        return (
            <>
            {productList.map(product => {
                return (
                    <ProductCard key={product.id} cart={this.props.cart} product={product} />
                )
            })}
            </>
        )
    }


    getProductList = () => {
        // console.log('props', this.props)
        let id = this.props.category && this.props.category.id || 'all'
        fetch(GET_PRODUCTS+id)
        .then(res => res.json())
        .then(productList => this.setState({productList}));
    }

    componentDidUpdate(prevProps) {
        if((this.props.category && !prevProps.category) || (prevProps.category && prevProps.category.id !== this.props.category.id) || !this.state.productList.length){
            this.getProductList();
        }
    }
}