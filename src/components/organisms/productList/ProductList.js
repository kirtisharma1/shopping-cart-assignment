import React, { useState, useEffect } from 'react';
import ProductCard from '../../molecules/productCard/ProductCard';
import { GET_PRODUCTS } from '../../../constants';

export default function ProductList(props) {
    const [productList, setProductList] = useState([]);
    const [isAllCategory, setIsAllCategory] = useState(false);

    const getProductList = () => {
        let id = props.category && props.category.id || 'all';
        setIsAllCategory(id === 'all');
        fetch(GET_PRODUCTS+id)
        .then(res => res.json())
        .then(productList => setProductList(productList));
    }

    useEffect(() => {
            if(props.category) {
                if(productList.length && productList[0].category === props.category.id && !isAllCategory){
                }else {
                    getProductList();
                }
            }else {
                if(productList.length && isAllCategory) {

                }else {
                    getProductList();
                }
            }
        });

    return (
        <>
        {productList.map(product => {
            return (
                <ProductCard category={props.category} key={product.id} cart={props.cart} product={product} />
            )
        })}
        </>
    )
}