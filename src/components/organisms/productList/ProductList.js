import React, { useState, useEffect } from 'react';
import ProductCard from '../../molecules/productCard/ProductCard';
import { GET_PRODUCTS } from '../../../constants';

export default function ProductList({cart, category}) {
  const [productList, setProductList] = useState([]);
  const [isAllCategory, setIsAllCategory] = useState(false);

  const getProductList = () => {
    let id = category && category.id || 'all';
    setIsAllCategory(id === 'all');
    fetch(GET_PRODUCTS + id)
      .then(res => res.json())
      .then(productList => setProductList(productList));
  }

  useEffect(() => {
    if (category) {
      if (productList.length && productList[0].category === category.id && !isAllCategory) {
      } else {
        getProductList();
      }
    } else {
      if (productList.length && isAllCategory) {

      } else {
        getProductList();
      }
    }
  }, [category]);

  return (
    <>
      {productList.map(product => {
        return (
          <ProductCard key={product.id} cart={cart} product={product} />
        )
      })}
    </>
  )
}