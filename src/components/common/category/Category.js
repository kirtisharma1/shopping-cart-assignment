import React from 'react';
import { Link } from 'react-router-dom';
import * as const_home from '../../../constants';
import './category.scss';

export default function Category(props) {
    const category = props.details;
    return (
        <article className={props.className + ' article-category clearfix row'} tabIndex="0" aria-label={category.name}>
            <div className="category-content">
                <h1>{category.name}</h1>
                <p tabIndex="0">{category.description}</p>
                <Link to={{pathname : '/plp/'+ category.key, state: {id: category.id}}}>{category.name}</Link>
            </div>
            <div className="category-image">
                <img src={category.imageUrl} alt={const_home.CATEGORY_IMAGE_ALT}></img>
            </div>
        </article>
    )
}