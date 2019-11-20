import React from 'react';
import NavLink from '../../atoms/link/NavLink';
import { withRouter } from 'react-router-dom';
import ProductList from '../productList/ProductList';
import DropDown from '../../atoms/dropDown/DropDown';
import './plp.scss';

const Menu = withRouter(DropDown);

export default function PLP(props) {
  const { cart, categoryList, match, location } = props;
  let { id } = match.params;
  let details = location.state;
  const selectedCategory = details ?
    categoryList.find(category => category.id === details.id) :
    id ? categoryList.find(category => category.key === id) : {};

  return (
    <section className='plp row section-main'>
      <div className='plp__left-col'>
          {categoryList.map(item => {
            return (
              <NavLink 
                key={item.key} 
                to={{ pathname: '/plp/' + item.key, state: { id: item.id } }} 
                className={`plp__left-col__item ${(selectedCategory && item.id === selectedCategory.id ? 'selected' : '')}`}
              >
                {item.name}
              </NavLink>
            )
          })}
      </div>
      <Menu categoryList={categoryList} url='plp/' />

      <ul className='plp__right-col'>
        <ProductList cart={cart} category={selectedCategory} />
      </ul>
    </section>
  )
}