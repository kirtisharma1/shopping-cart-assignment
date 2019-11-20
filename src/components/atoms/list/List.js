import React from 'react';

export default function List({childNodes, ...restProps}) {
  return (
    <ul {...restProps}>
      {childNodes.map((child, index) => (<li key={index} className={`${restProps.className}__item`}>{child}</li>)
      )}
    </ul>
  )
}