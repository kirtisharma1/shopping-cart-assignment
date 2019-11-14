import React from 'react';
import NavLink from '../../atoms/link/NavLink';
import Image from '../../atoms/image/Image';
import * as constHome from '../../../constants';
import './category.scss';

export default function Category(props) {
  const { details, className } = props;
  const category = { ...details };
  const categoryContent = (
    <div className="category__content">
      <h1 className="category__title">{category.name}</h1>
      <p className="category__description">{category.description}</p>
      <NavLink to={{ pathname: '/plp/' + category.key, state: { id: category.id } }}>{category.name}</NavLink>
    </div>
  );
  const categoryImage = (
    <div className="category__image-container">
      <Image className="category__image-container__image" src={category.imageUrl} alt={constHome.CATEGORY_IMAGE_ALT} />
    </div>
  );

  return (
    <li className="category clearfix row">
      {className === 'even' ? (
        <>
          {categoryContent}
          {categoryImage}
        </>
      ) : (
        <>
          {categoryImage}
          {categoryContent}
        </>
      )}
    </li>
  )
}