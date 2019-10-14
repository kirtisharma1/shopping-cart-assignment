import React from 'react';
import { Link } from 'react-router-dom';
import './category.scss';

export default function Category(props) {
    const category = props.details;
    return (
        <article className={props.className + ' article-category clearfix row'}>
            <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <Link to={{pathname : '/plp/'+ category.name, state: {id: category.id}}}>{category.name}</Link>
            </div>
            <div className="category-image">
                <img src={category.imageUrl}></img>
            </div>
        </article>
    )
}