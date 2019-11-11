import React from 'react';
import { Link } from 'react-router-dom';
import * as constHome from '../../../constants';
import './category.scss';

export default function Category(props) {
  const { details, className } = props;
  const category = { ...details };
  return (
    <li className="category clearfix row" aria-label={category.name}>
      {className === 'even' ? (
        <>
          <div className="category__content">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <Link to={{ pathname: '/plp/' + category.key, state: { id: category.id } }}>{category.name}</Link>
          </div>
          <div className="category__image">
            <img src={category.imageUrl} alt={constHome.CATEGORY_IMAGE_ALT}></img>
          </div>
        </>
      ) : (
        <>
          <div className="category__image">
            <img src={category.imageUrl} alt={constHome.CATEGORY_IMAGE_ALT}></img>
          </div>
          <div className="category__content">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <Link to={{ pathname: '/plp/' + category.key, state: { id: category.id } }}>{category.name}</Link>
          </div>
        </>
      )}
    </li>
  )
}